import fetch, { Response } from 'node-fetch';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';
import { retry } from '@lifeomic/attempt';

import { IntegrationConfig } from './config';
import {
  EsperApplication,
  EsperDevice,
  EsperDeviceGroup,
  EsperEnterprise,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}
  private limit = 100;
  private withBaseUri = (path: string) =>
    `https://${this.config.domain}-api.esper.cloud/api/enterprise/${this.config.enterpriseId}/${path}`;

  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  private async request(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<Response> {
    try {
      const options = {
        method,
        headers: {
          Authorization: `Bearer ${this.config.accessToken}`,
        },
      };

      // Handle rate-limiting
      const response = await retry(
        async () => {
          const res: Response = await fetch(uri, options);
          this.checkStatus(res);
          return res;
        },
        {
          delay: 5000,
          maxAttempts: 10,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );
      return response.json();
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  private async paginatedRequest<T>(
    uri: string,
    iteratee: ResourceIteratee<T>,
  ): Promise<void> {
    try {
      let next = null;
      do {
        const response = await this.request(next || uri, 'GET');

        for (const result of response.results) await iteratee(result);
        next = response.next;
      } while (next);
    } catch (err) {
      throw new IntegrationProviderAPIError({
        cause: new Error(err.message),
        endpoint: uri,
        status: err.statusCode,
        statusText: err.message,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const uri = this.withBaseUri('');
    try {
      await this.request(uri);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async fetchEnterprise(): Promise<EsperEnterprise> {
    const uri = this.withBaseUri(``);
    return this.request(uri);
  }

  /**
   * Iterates each application resource in the provider.
   *
   * @param iteratee receives each applcation to produce entities/relationships
   */
  public async iterateApplications(
    iteratee: ResourceIteratee<EsperApplication>,
  ): Promise<void> {
    await this.paginatedRequest<EsperApplication>(
      this.withBaseUri(`application/?limit=${this.limit}`),
      iteratee,
    );
  }

  /**
   * Iterates each device group resource in the provider.
   *
   * @param iteratee receives each device group to produce entities/relationships
   */
  public async iterateDeviceGroups(
    iteratee: ResourceIteratee<EsperDeviceGroup>,
  ): Promise<void> {
    await this.paginatedRequest<EsperDeviceGroup>(
      this.withBaseUri(`devicegroup/?limit=${this.limit}`),
      iteratee,
    );
  }

  /**
   * Iterates each device resource in the provider.
   *
   * @param iteratee receives each device to produce entities/relationships
   */
  public async iterateDevices(
    iteratee: ResourceIteratee<EsperDevice>,
  ): Promise<void> {
    await this.paginatedRequest<EsperDevice>(
      this.withBaseUri(`device/?limit=${this.limit}`),
      iteratee,
    );
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
