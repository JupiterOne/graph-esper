import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const deviceGroupSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: enterprise/{{enterpriseId}}/devicegroup
     * PATTERN: Fetch Entities
     */
    id: 'fetch-device-groups',
    name: 'Fetch Device Groups',
    entities: [
      {
        resourceName: 'Device Group',
        _type: 'esper_device_group',
        _class: ['Group'],
      },
    ],
    relationships: [
      {
        _type: 'esper_account_has_device_group',
        sourceType: 'esper_account',
        _class: RelationshipClass.HAS,
        targetType: 'esper_device_group',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
