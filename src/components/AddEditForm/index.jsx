import { useEffect, useState } from 'react';

import { CommonInput } from '../Inputs/CommonInput';
import { DropdownInput } from '../Inputs/DropdownInput';
import { ADD, DEVICE_TYPE, DEVICE_TYPE_PLACEHOLDER, deviceTypes, EDIT, HDD_CAPACITY, SYSTEM_NAME } from '../../constants';
import { useDevices } from '../../contexts/DevicesContext';
import { FooterActions } from '../FooterActions';
import { useModal } from '../../contexts/ModalContext';

import './index.css';

const initialAddDeviceData = {
    [SYSTEM_NAME]: '',
    [DEVICE_TYPE]: '',
    [HDD_CAPACITY]: ''
}

export const AddEditForm = () => {
    const [addDeviceData, setAddDeviceData] = useState(initialAddDeviceData);
    const { deviceToEdit, deviceIdToEdit, addDevice, editDevice } = useDevices()
    const { isModalOpen, toggleModal } = useModal()
    const isEditModalOpen = isModalOpen[EDIT]

    useEffect(() => {
        if (deviceToEdit) {
            setAddDeviceData(deviceToEdit)
        }
    }, [deviceToEdit])

    const handleChange = (e) => {
        setAddDeviceData({
            ...addDeviceData,
            [e.target.name]: e.target.value
        });
    };

    const onClose = () => {
        toggleModal(isEditModalOpen ? EDIT : ADD)
        handleReset()
    }

    const handleReset = () => {
        setAddDeviceData(initialAddDeviceData)
        deviceIdToEdit(null)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const submitFunction = isEditModalOpen ? editDevice : addDevice
        submitFunction(addDeviceData)
        onClose()
    }

    return (
        <form className="device-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor={SYSTEM_NAME}>
                    Name *
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
                    Type *
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
                    HDD Capacity (GB) *
                </label>
                <CommonInput
                    id={HDD_CAPACITY}
                    name={HDD_CAPACITY}
                    value={addDeviceData[HDD_CAPACITY]}
                    onChange={handleChange}
                    type='number'
                    width='490px'
                />
            </div>
            <FooterActions
                onCancel={onClose}
                onContinue={onSubmit}
            />
        </form>
    );
};