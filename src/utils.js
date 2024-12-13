import { DEVICE_TYPE } from "./constants";

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const formatDevicesForUI = (devices) => {
    return devices.map(device => {
        return {
            ...device,
            [DEVICE_TYPE]: `${capitalize(device[DEVICE_TYPE])} workstation`,
        }
    })
}