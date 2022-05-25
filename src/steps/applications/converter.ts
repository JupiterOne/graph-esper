import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { EsperApplication } from '../../types';
import { Entities } from '../constants';

export function createApplicationEntity(application: EsperApplication): Entity {
  return createIntegrationEntity({
    entityData: {
      source: application,
      assign: {
        _type: Entities.APPLICATION._type,
        _class: Entities.APPLICATION._class,
        _key: `esper_application:${application.id}`,
        id: application.id,
        name: application.application_name,
        packageName: application.package_name,
        developer: application.developer,
        category: application.category,
        contentRating: application.content_rating,
        compatibility: application.compatibility,
        createdOn: parseTimePropertyValue(application.created_on),
        updatedOn: parseTimePropertyValue(application.updated_on),
        isActive: application.is_active,
        isHidden: application.is_hidden,
        autoUpdateApp: application.auto_update_app,
        enterprise: application.enterprise,
      },
    },
  });
}
