import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { EsperDeviceGroup } from '../../types';
import { Entities } from '../constants';

export function getDeviceGroupKey(id: string): string {
  return `esper_device_group:${id}`;
}

export function createDeviceGroupEntity(deviceGroup: EsperDeviceGroup): Entity {
  return createIntegrationEntity({
    entityData: {
      source: deviceGroup,
      assign: {
        _type: Entities.DEVICE_GROUP._type,
        _class: Entities.DEVICE_GROUP._class,
        _key: getDeviceGroupKey(deviceGroup.id),
        id: deviceGroup.id,
        name: deviceGroup.name,
        description: deviceGroup.description,
        createdOn: parseTimePropertyValue(deviceGroup.created_on),
        updatedOn: parseTimePropertyValue(deviceGroup.updated_on),
        enterprise: deviceGroup.enterprise,
        deviceCount: deviceGroup.device_count,
        path: deviceGroup.path,
        childrenCount: deviceGroup.children_count,
        blueprint: deviceGroup.blueprint,
      },
    },
  });
}
