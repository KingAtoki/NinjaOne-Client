import { SYSTEM_NAME, DEVICE_TYPE, HDD_CAPACITY } from "./constants";

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const formatDevicesForUI = (devices) => {
    return devices.map(device => {
        return {
            ...device,
            [SYSTEM_NAME]: device.system_name,
            [DEVICE_TYPE]: device.type,
            [HDD_CAPACITY]: device.hdd_capacity
        }
    })
}