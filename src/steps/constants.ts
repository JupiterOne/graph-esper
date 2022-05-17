import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  APPLICATION: 'fetch-application',
  DEVICE_GROUPS: 'fetch-device-groups',
  DEVICE_GROUPS_DEVICE: 'build-device-groups-device-relationship',
  DEVICE: 'fetch-devices',
};

export const Entities: Record<
  'ACCOUNT' | 'APPLICATION' | 'DEVICE_GROUP' | 'DEVICE',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'esper_account',
    _class: ['Account'],
  },
  APPLICATION: {
    resourceName: 'Application',
    _type: 'esper_application',
    _class: ['Application'],
  },
  DEVICE_GROUP: {
    resourceName: 'Device Group',
    _type: 'esper_device_group',
    _class: ['Group'],
  },
  DEVICE: {
    resourceName: 'Device',
    _type: 'esper_device',
    _class: ['Device'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_APPLICATION'
  | 'ACCOUNT_HAS_DEVICE_GROUP'
  | 'DEVICE_GROUP_HAS_DEVICE'
  | 'ACCOUNT_HAS_DEVICE',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_APPLICATION: {
    _type: 'esper_account_has_application',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.APPLICATION._type,
  },
  ACCOUNT_HAS_DEVICE_GROUP: {
    _type: 'esper_account_has_device_group',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DEVICE_GROUP._type,
  },
  DEVICE_GROUP_HAS_DEVICE: {
    _type: 'esper_device_group_has_device',
    sourceType: Entities.DEVICE_GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DEVICE._type,
  },
  ACCOUNT_HAS_DEVICE: {
    _type: 'esper_account_has_device',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DEVICE._type,
  },
};
