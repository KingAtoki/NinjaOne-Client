import { createContext, useState, useContext, useEffect } from 'react';
import { formatDevicesForUI } from '../utils';

const testDevices = [
    {
        id: 1,
        system_name: 'DESKTOP-ONE',
        type: 'WINDOWS',
        hdd_capacity: '92',
    },
    {
        id: 2,
        system_name: 'DESKTOP-TWO',
        type: 'MAC',
        hdd_capacity: '256',
    },
    {
        id: 3,
        system_name: 'DESKTOP-THREE',
        type: 'LINUX',
        hdd_capacity: '512',
    },
]


const DevicesContext = createContext({
    devices: [],
    deviceToEdit: null,
    editDevice: () => { },
});

// eslint-disable-next-line react/prop-types
export function DevicesProvider({ children }) {
    const [devices, setDevices] = useState([]);
    const [deviceToEdit, setDeviceToEdit] = useState({});

    useEffect(() => {
        setDevices(testDevices);
    }, []);

    const editDevice = (deviceId) => {
        if (!deviceId) {
            setDeviceToEdit(null);
        } else {
            const selectedDevice = devices.find(device => device.id === deviceId);
            setDeviceToEdit(formatDevicesForUI([selectedDevice])[0]);
        }
    };

    const value = {
        devices,
        deviceToEdit,
        editDevice
    };

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