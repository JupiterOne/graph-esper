import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { invocationConfig } from '../src';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_DOMAIN = 'dummy-acme-client-id';
const DEFAULT_ACCESS_TOKEN = 'dummy-acme-client-secret';
const DEFAULT_ENTERPRISE_ID = 'dummy-enterprise-id';

export const integrationConfig: IntegrationConfig = {
  domain: process.env.DOMAIN || DEFAULT_DOMAIN,
  accessToken: process.env.ACCESS_TOKEN || DEFAULT_ACCESS_TOKEN,
  enterpriseId: process.env.ENTERPRISE_ID || DEFAULT_ENTERPRISE_ID,
};

export function buildStepTestConfigForStep(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}
