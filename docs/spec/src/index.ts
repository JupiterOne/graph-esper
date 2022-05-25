import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accountSpec } from './account';
import { applicationSpec } from './applications';
import { deviceSpec } from './device';
import { deviceGroupSpec } from './device-groups';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...applicationSpec,
    ...deviceGroupSpec,
    ...deviceSpec,
  ],
};
