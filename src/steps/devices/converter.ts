import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { EsperDevice } from '../../types';
import { Entities } from '../constants';

export function createDeviceEntity(device: EsperDevice): Entity {
  return createIntegrationEntity({
    entityData: {
      source: device,
      assign: {
        _type: Entities.DEVICE._type,
        _class: Entities.DEVICE._class,
        _key: `esper_device:${device.id}`,
        category: 'mobile',
        id: device.id,
        deviceId: device.id,
        webLink: device.url,
        name: device.device_name,
        status: 'unknown',
        'memoryInfo.totalRam': device.memoryInfo.totalRam,
        'memoryInfo.totalInternalStorage':
          device.memoryInfo.totalInternalStorage,
        'memoryInfo.internalStorageBinaryPrefix':
          device.memoryInfo.internalStorageBinaryPrefix,
        'displays.name': device.displays.name,
        'displays.width': device.displays.width,
        'displays.height': device.displays.height,
        'displays.density': device.displays.density,
        'displays.displayId': device.displays.displayId,
        'displays.refreshRate': device.displays.refreshRate,
        'softwareInfo.supportedAbi': device.softwareInfo.supportedAbi,
        'softwareInfo.androidVersion': device.softwareInfo.androidVersion,
        'softwareInfo.androidBuildTime': device.softwareInfo.androidBuildTime,
        'softwareInfo.bootloaderVersion': device.softwareInfo.bootloaderVersion,
        'softwareInfo.androidBuildNumber':
          device.softwareInfo.androidBuildNumber,
        'softwareInfo.securityPatchLevel':
          device.softwareInfo.securityPatchLevel,
        'softwareInfo.deviceKernelVersion':
          device.softwareInfo.deviceKernelVersion,
        make: device.hardwareInfo.brand,
        model: device.hardwareInfo.model,
        'hardwareInfo.hardware': device.hardwareInfo.hardware,
        'hardwareInfo.manufacturer': device.hardwareInfo.manufacturer,
        'hardwareInfo.DeviceBasebandVersion':
          device.hardwareInfo.deviceBasebandVersion,
        serial: device.hardwareInfo.serialNumber,
        'networkInfo.imei1': device.networkInfo.imei1,
        'networkInfo.imei2': device.networkInfo.imei2,
        'networkInfo.wifiMacAddress': device.networkInfo.wifiMacAddress,
        mqttId: device.mqtt_id,
        iotMqttBaseTopic: device.iot_mqtt_base_topic,
        state: device.state,
        suid: device.suid,
        fcmId: device.fcm_id,
        apiLevel: device.api_level,
        createdOn: parseTimePropertyValue(device.created_on),
        updatedOn: parseTimePropertyValue(device.updated_on),
        isActive: device.is_active,
        provisionedOn: parseTimePropertyValue(device.provisioned_on),
        isGms: device.is_gms,
        esperClient: device.esper_client,
        enterprise: device.enterprise,
        user: device.user,
        groups: device.groups,
        useMqtt: device.use_mqtt,
        useIotMqtt: device.use_iot_mqtt,
        deviceType: device.device_type,
        currentAppMode: device.current_app_mode,
        lockdownState: device.lockdown_state,
        timezoneString: device.timezone_string,
        initialtemplate: device.initialtemplate,
      },
    },
  });
}
