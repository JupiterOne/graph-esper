import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { EsperEnterprise } from '../../types';
import { Entities } from '../constants';

export function createAccountEntity(enterprise: EsperEnterprise): Entity {
  return createIntegrationEntity({
    entityData: {
      source: enterprise,
      assign: {
        _key: `esper_account:${enterprise.id}`,
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        id: enterprise.id,
        webLink: enterprise.url,
        name: enterprise.name,
        displayName: enterprise.display_name,
        shortCode: enterprise.short_code,
        mdmService: enterprise.mdm_service,
        'details.id': enterprise.details.id,
        'details.registeredName': enterprise.details.registered_name,
        'details.registeredAddress': enterprise.details.registered_address,
        'details.location': enterprise.details.location,
        'details.zipcode': enterprise.details.zipcode,
        'details.contactPerson': enterprise.details.contact_person,
        'details.contactNumber': enterprise.details.contact_number,
        'details.contactEmail': enterprise.details.contact_email,
        'details.createdOn': parseTimePropertyValue(
          enterprise.details.created_on,
        ),
        'details.updatedOn': parseTimePropertyValue(
          enterprise.details.updated_on,
        ),
        'details.isActive': enterprise.details.is_active,
        createdOn: parseTimePropertyValue(enterprise.created_on),
        updatedOn: parseTimePropertyValue(enterprise.updated_on),
        isActive: enterprise.is_active,
        'emm.id': enterprise.emm.id,
        'emm.googleEnterpriseId': enterprise.emm.google_enterprise_id,
        'emm.name': enterprise.emm.name,
        'emm.state': enterprise.emm.state,
        'emm.callbackUrl': enterprise.emm.callback_url,
        'emm.isActive': enterprise.emm.is_active,
        'emm.createdOn': parseTimePropertyValue(enterprise.emm.created_on),
        'emm.updatedOn': parseTimePropertyValue(enterprise.emm.updated_on),
        'emm.enterprise': enterprise.emm.enterprise,
      },
    },
  });
}
