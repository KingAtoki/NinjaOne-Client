import { useEffect, useState } from 'react';

import { CommonInput } from '../Inputs/CommonInput';
import { DropdownInput } from '../Inputs/DropdownInput';
import { DEVICE_TYPE, DEVICE_TYPE_PLACEHOLDER, deviceTypes, HDD_CAPACITY, SYSTEM_NAME } from '../../constants';
import { useDevices } from '../../contexts/DevicesContext';

import './index.css';

const initialAddDeviceData = {
    [SYSTEM_NAME]: '',
    [DEVICE_TYPE]: '',
    [HDD_CAPACITY]: ''
}

export const AddEditForm = () => {
    const [addDeviceData, setAddDeviceData] = useState(initialAddDeviceData);
    const { deviceToEdit } = useDevices()

    useEffect(() => {
        if (deviceToEdit) {
            setAddDeviceData(deviceToEdit)
        }

        return () => {
            setAddDeviceData(initialAddDeviceData)
        }

    }, [deviceToEdit])

    const handleChange = (e) => {
        setAddDeviceData({
            ...addDeviceData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form className="device-form">
            <div className="form-group">
                <label htmlFor={SYSTEM_NAME}>
                    {SYSTEM_NAME} *
                </label>
                <CommonInput
                    id={SYSTEM_NAME}
                    name={SYSTEM_NAME}
                    value={addDeviceData[SYSTEM_NAME]}
                    onChange={handleChange}
                    width='490px'
                />
            </div>

            <div className="form-group">
                <label htmlFor={DEVICE_TYPE}>
                    {DEVICE_TYPE} *
                </label>
                <DropdownInput
                    required
                    id={DEVICE_TYPE}
                    name={DEVICE_TYPE}
                    onChange={handleChange}
                    options={[{ label: DEVICE_TYPE_PLACEHOLDER, value: '', disabled: true, }, ...deviceTypes]}
                    value={addDeviceData[DEVICE_TYPE]}

                />
            </div>

            <div className="form-group">
                <label htmlFor={HDD_CAPACITY}>
                    {HDD_CAPACITY} *
                </label>
                <CommonInput
                    id={HDD_CAPACITY}
                    name={HDD_CAPACITY}
                    value={addDeviceData[HDD_CAPACITY]}
                    onChange={handleChange}
                    min='0'
                    width='490px'
                />
            </div>
        </form>
    );
};