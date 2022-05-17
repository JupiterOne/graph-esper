import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Relationships, Steps } from '../constants';
import { createDeviceGroupEntity } from './converter';

export async function fetchDeviceGroups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateDeviceGroups(async (deviceGroup) => {
    const deviceGroupEntity = await jobState.addEntity(
      createDeviceGroupEntity(deviceGroup),
    );

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: deviceGroupEntity,
      }),
    );
  });
}

export const deviceGroupSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DEVICE_GROUPS,
    name: 'Fetch Device Groups',
    entities: [Entities.DEVICE_GROUP],
    relationships: [Relationships.ACCOUNT_HAS_DEVICE_GROUP],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchDeviceGroups,
  },
];
