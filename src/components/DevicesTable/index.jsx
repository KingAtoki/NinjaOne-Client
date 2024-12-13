import { Fragment, useState } from 'react';

import { EditDeleteButton } from '../EditDeleteButton';
import AppleIcon from '../../assets/apple.svg';
import WindowsIcon from '../../assets/windows.svg';
import LinuxIcon from '../../assets/linux.svg';
import { LINUX_WORKSTATION, MAC_WORKSTATION, WINDOWS_WORKSTATION } from '../../constants';
import { useDevices } from '../../contexts/DevicesContext';
import { capitalize } from '../../utils';


import './index.css';

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