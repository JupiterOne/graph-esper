import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const applicationSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: enterprise/{{enterpriseId}}/applications
     * PATTERN: Fetch Entities
     */
    id: 'fetch-application',
    name: 'Fetch Applications',
    entities: [
      {
        resourceName: 'Application',
        _type: 'esper_application',
        _class: ['Application'],
      },
    ],
    relationships: [
      {
        _type: 'esper_account_has_application',
        sourceType: 'esper_account',
        _class: RelationshipClass.HAS,
        targetType: 'esper_application',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
