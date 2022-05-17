export type EsperEnterprise = {
  id: string;
  url: string;
  name: string;
  display_name: string;
  short_code: string;
  mdm_service: number;
  details: {
    id: string;
    registered_name: string;
    registered_address: string;
    location: string;
    zipcode: string;
    contact_person: string;
    contact_number: string;
    contact_email: string;
    created_on: string;
    updated_on: string;
    is_active: boolean;
  };
  created_on: string;
  updated_on: string;
  is_active: boolean;
  emm: {
    id: number;
    google_enterprise_id: string;
    name: string;
    state: number;
    callback_url: string;
    signup_url: string;
    completion_token: string;
    enterprise_token: string;
    is_active: boolean;
    created_on: string;
    updated_on: string;
    enterprise: string;
  };
};

export type EsperApplication = {
  id: string;
  versions: {
    id: string;
    version_code: string;
    build_number: string;
    hash_string: string;
    download_url: string;
    icon_url: string;
    min_sdk_version: string;
    target_sdk_version: string;
    release_name: string;
    release_comments: string;
  }[];
  application_name: string;
  package_name: string;
  developer: string;
  category: string;
  content_rating: string;
  compatibility: string;
  created_on: string;
  updated_on: string;
  is_active: boolean;
  is_hidden: boolean;
  auto_update_app: boolean;
  enterprise: string;
};

export type EsperDeviceGroup = {
  id: string;
  name: string;
  description: string;
  created_on: string;
  updated_on: string;
  enterprise: string;
  device_count: number;
  path: string;
  children_count: number;
  blueprint: string;
};

export type EsperDevice = {
  id: string;
  url: string;
  device_name: string;
  status: number;
  memoryInfo: {
    totalRam: string;
    totalInternalStorage: string;
    internalStorageBinaryPrefix: boolean;
  };
  displays: {
    name: string;
    width: number;
    height: number;
    density: number;
    displayId: number;
    refreshRate: number;
  };
  softwareInfo: {
    supportedAbi: string;
    androidVersion: string;
    androidBuildTime: number;
    bootloaderVersion: string;
    androidBuildNumber: string;
    securityPatchLevel: string;
    deviceKernelVersion: string;
  };
  hardwareInfo: {
    brand: string;
    model: string;
    hardware: string;
    manufacturer: string;
    serialNumber: string;
    deviceBasebandVersion: string;
  };
  networkInfo: {
    imei1: string;
    imei2: string;
    wifiMacAddress: string;
  };
  mqtt_id: string;
  iot_mqtt_base_topic: string;
  state: number;
  suid: string;
  fcm_id: string;
  api_level: number;
  created_on: string;
  updated_on: string;
  is_active: boolean;
  provisioned_on: string;
  is_gms: boolean;
  esper_client: string;
  enterprise: string;
  user: string;
  groups: string[];
  use_mqtt: boolean;
  use_iot_mqtt: boolean;
  device_type: string;
  current_app_mode: number;
  lockdown_state: number;
  timezone_string: string;
  wifi_access_points: {
    id: string;
    wifi_ssid: string;
    wifi_security_type: string;
    wifi_phase2_auth: string;
    config_style: string;
    wifi_eap_method: string;
    identity: string;
    anonymous_identity: string;
    domain: string;
    hidden: boolean;
  }[];
  initialtemplate: string;
};
