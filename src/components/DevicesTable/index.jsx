import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';

import { EditDeleteButton } from '../EditDeleteButton';
import AppleIcon from '../../assets/apple.svg';
import WindowsIcon from '../../assets/windows.svg';
import LinuxIcon from '../../assets/linux.svg';
import { LINUX, MAC, WINDOWS } from '../../constants';
import { capitalize } from '../../utils';


import './index.css';

const getIcon = (type) => {
    switch (capitalize(type)) {
        case WINDOWS:
            return WindowsIcon;
        case MAC:
            return AppleIcon;
        case LINUX:
            return LinuxIcon;
        default:
            return '';
    }
}

export const DevicesTable = ({ devices }) => {
    const [activeRow, setActiveRow] = useState(null)

    return (
        <div className="device-table" onMouseLeave={() => setActiveRow(null)}>
            <span>Device</span>
            <hr />
            {devices.map(device => {
                return (
                    <Fragment key={device.id} >
                        <div className="device-table_row" onMouseOver={() => setActiveRow(device)} >
                            <div>
                                <div className='device-table_row--header'>
                                    <img src={getIcon(device.type)} alt={device.type} />
                                    <span>{device.system_name}</span>
                                </div>
                                <div className="device-table_row--device-details">
                                    {capitalize(device.type)} workstation - {device.hdd_capacity} GB
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

DevicesTable.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        system_name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        hdd_capacity: PropTypes.string.isRequired,
    })).isRequired,
}  