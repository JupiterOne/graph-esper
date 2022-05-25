import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  domain: {
    type: 'string',
  },
  accessToken: {
    type: 'string',
    mask: true,
  },
  enterpriseId: {
    type: 'string',
  },
};

/**
 * Properties provided by the `IntegrationInstance.config`. This reflects the
 * same properties defined by `instanceConfigFields`.
 */
export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The provider API client ID used to authenticate requests.
   */
  domain: string;

  /**
   * The provider API client secret used to authenticate requests.
   */
  accessToken: string;

  /**
   * The provider enterprise Id.
   */
  enterpriseId: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.domain || !config.accessToken || !config.enterpriseId) {
    throw new IntegrationValidationError(
      'Config requires all of {domain, accessToken, enterpriseId}',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
