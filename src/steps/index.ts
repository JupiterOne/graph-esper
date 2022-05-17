import { accountSteps } from './account';
import { applicationSteps } from './applications';
import { deviceGroupSteps } from './device-groups';
import { deviceSteps } from './devices';

const integrationSteps = [
  ...accountSteps,
  ...applicationSteps,
  ...deviceGroupSteps,
  ...deviceSteps,
];

export { integrationSteps };
