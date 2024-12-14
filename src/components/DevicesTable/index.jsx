import { Fragment, useState } from 'react';

import { EditDeleteButton } from '../EditDeleteButton';
import AppleIcon from '../../assets/apple.svg';
import WindowsIcon from '../../assets/windows.svg';
import LinuxIcon from '../../assets/linux.svg';
import { LINUX_WORKSTATION, MAC_WORKSTATION, WINDOWS_WORKSTATION } from '../../constants';
import { useDevices } from '../../contexts/DevicesContext';
import { capitalize } from '../../utils';


import './index.css';

/**
 * Determines the appropriate OS icon based on device type
 * 
 * @function
 * @param {string} type - The device type
 * @returns {string} Path to the corresponding OS icon
 */
const getIcon = (type) => {
    switch (capitalize(type)) {
        case WINDOWS_WORKSTATION:
            return WindowsIcon;
        case MAC_WORKSTATION:
            return AppleIcon;
        case LINUX_WORKSTATION:
            return LinuxIcon;
        default:
            return '';
    }
}

/**
 * DevicesTable Component
 * 
 * @returns {JSX.Element} A div container with the devices table
 * 
 * @component
 * @description
 * Renders a table of devices with the following features:
 * - Displays device OS icon, name, type, and storage capacity
 * - Shows edit/delete buttons on row hover
 * - Handles empty states and filtering
 * - Responsive to mouse interactions
 * 
 * Each device row includes:
 * - OS specific icon (Windows, Mac, or Linux)
 * - System name
 * - Device type and HDD capacity
 * - Edit/Delete buttons (visible on hover)
 */
export const DevicesTable = () => {
    const [activeRow, setActiveRow] = useState(null)
    const { devices, formattedDevicesList } = useDevices()
    const noDevicesMatchFilters = !formattedDevicesList.length && devices.length
  
    return (
        <div className="device-table" onMouseLeave={() => setActiveRow(null)}>
            <span>Device</span>
            <hr />
            {noDevicesMatchFilters &&
                <span>
                    No devices match the selected filters.
                </span>
            }
            {formattedDevicesList.map(device => {
                return (
                    <Fragment key={device.id} >
                        <div className="device-table_row" onMouseOver={() => setActiveRow(device)} >
                            <div>
                                <div className='device-table_row--header'>
                                    <img src={getIcon(device.type)} alt={device.type} />
                                    <span>{device.system_name}</span>
                                </div>
                                <div className="device-table_row--device-details">
                                    {device.type} - {device.hdd_capacity} GB
                                </div>
                            </div>
                            <div className='device-table_row--right-content'>
                                {device.id === activeRow?.id && <div className="device-table_row--actions">
                                    <EditDeleteButton deviceId={device.id} />
                                </div>}
                            </div>
                        </div>
                        <hr />
                    </Fragment>
                )
            })}

        </div>
    )
}