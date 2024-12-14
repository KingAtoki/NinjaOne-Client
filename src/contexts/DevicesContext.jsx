import { createContext, useState, useContext, useEffect } from 'react';
import { formatDeviceForBackend, formatDevicesForUI } from '../utils';
import * as devicesApi from '../api/devices'

/**
 * @typedef {Object} DevicesContextType
 * @property {Array} devices - Array of all devices
 * @property {Object|null} deviceToEdit - Currently selected device for editing
 * @property {Function} formatDevices - Function to format/filter devices list
 * @property {Function} deviceIdToEdit - Function to set device for editing. Takes an id and uses that to find the corresponding device
 * @property {Array} formattedDevicesList - Formatted/filtered array of devices
 * @property {Function} addDevice - Function to add new device
 * @property {Function} removeDevice - Function to remove device
 * @property {Function} editDevice - Function to edit existing device
 */

/**
 * Initial context value with default empty functions
 * @type {DevicesContextType}
 */
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

/**
 * DevicesProvider Component
 *
 * @component
 * @description
 * Provides context for managing devices data and operations. Includes:
 * - Device list state management
 * - CRUD operations with API integration
 * - Device formatting utilities
 * - Error handling
 */
// eslint-disable-next-line react/prop-types
export function DevicesProvider({ children }) {
    const [devices, setDevices] = useState([]);
    const [formattedDevicesList, setFormattedDevicesList] = useState([]);
    const [deviceToEdit, setDeviceToEdit] = useState({});

    useEffect(() => {
        getDevices();
    }, []);

    /**
     * Fetches devices from API and updates state
     * 
     * @async
     * @function
     */
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

    /**
     * Adds a new device
     * 
     * @async
     * @function
     * @param {Object} device - Device to add
     */
    const addDevice = async (device) => {
        const formattedDevice = formatDeviceForBackend(device);
        try {
            await devicesApi.post(formattedDevice);
            getDevices();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Updates an existing device
     * 
     * @async
     * @function
     * @param {Object} device - Device data to update
     */
    const editDevice = async (device) => {
        const formattedDevice = formatDeviceForBackend(device);
        try {
            await devicesApi.put(formattedDevice);
            getDevices();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Removes a device
     * 
     * @async
     * @function
     * @param {string} deviceId - ID of device to remove
     */
    const removeDevice = async (deviceId) => {
        try {
            await devicesApi.deleteEndpoint(deviceId);
            getDevices();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Formats and updates the devices list
     * 
     * @function
     * @param {Function} format - Formatting function to apply
     */
    const formatDevices = (format) => {
        setFormattedDevicesList(format(devices));
    };

    /**
     * Sets the device to edit based on ID
     * 
     * @function
     * @param {string|null} deviceId - ID of device to edit, or null to clear
     */
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