import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const deviceSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: enterprise/{{enterpriseId}}/device
     * PATTERN: Fetch Entities
     */
    id: 'fetch-devices',
    name: 'Fetch Devices',
    entities: [
      {
        resourceName: 'Device',
        _type: 'esper_device',
        _class: ['Device'],
      },
    ],
    relationships: [
      {
        _type: 'esper_account_has_device',
        sourceType: 'esper_account',
        _class: RelationshipClass.HAS,
        targetType: 'esper_device',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: N/A
     * PATTERN: Build child relationship
     */
    id: 'build-device-groups-device-relationship',
    name: 'Build Device and Device Group Relationships',
    entities: [],
    relationships: [
      {
        _type: 'esper_device_group_has_device',
        sourceType: 'esper_device_group',
        _class: RelationshipClass.HAS,
        targetType: 'esper_device',
      },
    ],
    dependsOn: ['fetch-device-groups', 'fetch-devices'],
    implemented: true,
  },
];
