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
import { getDeviceGroupKey } from '../device-groups/converter';
import { createDeviceEntity } from './converter';

export async function fetchDevices({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateDevices(async (device) => {
    const deviceEntity = await jobState.addEntity(createDeviceEntity(device));

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: deviceEntity,
      }),
    );
  });
}

export async function buildDeviceDeviceGroupRelationship({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.DEVICE._type },
    async (deviceEntity) => {
      const groups = deviceEntity.groups as string[];

      if (groups) {
        for (const group of groups) {
          const groupKey = group.split('/')[7];

          const deviceGroupEntity = await jobState.findEntity(
            getDeviceGroupKey(groupKey),
          );

          if (deviceGroupEntity) {
            await jobState.addRelationship(
              createDirectRelationship({
                _class: RelationshipClass.HAS,
                from: deviceGroupEntity,
                to: deviceEntity,
              }),
            );
          }
        }
      }
    },
  );
}

export const deviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DEVICE,
    name: 'Fetch Devices',
    entities: [Entities.DEVICE],
    relationships: [Relationships.ACCOUNT_HAS_DEVICE],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchDevices,
  },
  {
    id: Steps.DEVICE_GROUPS_DEVICE,
    name: 'Build Device and Device Group Relationships',
    entities: [],
    relationships: [Relationships.DEVICE_GROUP_HAS_DEVICE],
    dependsOn: [Steps.DEVICE_GROUPS, Steps.DEVICE],
    executionHandler: buildDeviceDeviceGroupRelationship,
  },
];
