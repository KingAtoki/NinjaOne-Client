import { createContext, useState, useContext, useEffect } from 'react';
import { formatDeviceForBackend, formatDevicesForUI } from '../utils';

import * as devicesApi from '../api/devices'

const DevicesContext = createContext({
    devices: [],
    deviceToEdit: null,
    formatDevices: () => { },
    deviceIdToEdit: () => { },
    formattedDevicesList: [],
    addDevice: () => { },
    removeDevice: () => { },
    editDevice: () => { },
});

// eslint-disable-next-line react/prop-types
export function DevicesProvider({ children }) {
    const [devices, setDevices] = useState([]);
    const [formattedDevicesList, setFormattedDevicesList] = useState([]);
    const [deviceToEdit, setDeviceToEdit] = useState({});

    useEffect(() => {
        getDevices();
    }, []);

    const getDevices = async () => {
        try {
            const data = await devicesApi.get()
            const formattedDevices = formatDevicesForUI(data);
            setDevices(formattedDevices);
            setFormattedDevicesList(formattedDevices);
        } catch (error) {
            console.error(error);
        }
    }

    const addDevice = async (device) => {
        const formattedDevice = formatDeviceForBackend(device);
        try {
            await devicesApi.post(formattedDevice);
            getDevices();
        } catch (error) {
            console.error(error);
        }
    }

    const editDevice = async (device) => {
        const formattedDevice = formatDeviceForBackend(device);
        try {
            await devicesApi.put(formattedDevice);
            getDevices();
        } catch (error) {
            console.error(error);
        }
    }

    const removeDevice = async (deviceId) => {
        try {
            await devicesApi.deleteEndpoint(deviceId);
            getDevices();
        } catch (error) {
            console.error(error);
        }
    }


    const formatDevices = (format) => {
        setFormattedDevicesList(format(devices));
    };

    const deviceIdToEdit = (deviceId) => {
        if (!deviceId) {
            setDeviceToEdit(null);
        } else {
            const selectedDevice = devices.find(device => device.id === deviceId);
            setDeviceToEdit(selectedDevice);
        }
    };

    const value = {
        devices,
        deviceToEdit,
        deviceIdToEdit,
        formatDevices,
        formattedDevicesList,
        addDevice,
        removeDevice,
        editDevice
    }

    return (
        <DevicesContext.Provider value={value}>
            {children}
        </DevicesContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDevices() {
    const context = useContext(DevicesContext);
    if (context === undefined) {
        throw new Error('useDevices must be used within a DevicesProvider');
    }
    return context;
}