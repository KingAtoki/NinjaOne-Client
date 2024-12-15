import { ADD, DELETE, EDIT, SYSTEM_NAME } from "../../constants"
import { useDevices } from "../../contexts/DevicesContext"
import { useModal } from "../../contexts/ModalContext"
import { AddDeviceModal } from "./AddDeviceModal"
import { DeleteDeviceModal } from "./DeleteDeviceModal"
import { EditDeviceModal } from "./EditDeviceModal"

import './index.css'

/**
 * ModalManager Component
 * 
 * @returns {JSX.Element} A modal rendered to either add or modify a device
 * 
 * @component
 * @description
 * A component that manages different modal states for device operations including
 * adding, editing, and deleting devices. 
 * It uses context providers for modal and device state management.
 * 
 * This component manages three types of modals:
 * 1. Add Device Modal - For adding new devices
 * 2. Edit Device Modal - For editing existing device details
 * 3. Delete Device Modal - For device deletion confirmation
 * 
 * The component uses two context hooks:
 * - useModal: Manages modal visibility states
 * - useDevices: Manages device related operations and state
 */
export const ModalManager = () => {
  const { isModalOpen, toggleModal } = useModal();
  const { deviceIdToEdit, deviceToEdit, removeDevice } = useDevices();

  const handleDeleteCancel = () => {
    toggleModal(DELETE);
    deviceIdToEdit(null);
  };

  const handleDelete = () => {
    removeDevice(deviceToEdit?.id);
    toggleModal(DELETE);
    deviceIdToEdit(null);
  };

  return (
    <div>
      {isModalOpen[ADD] && <AddDeviceModal onClose={() => toggleModal(ADD)} />}
      {isModalOpen[EDIT] && <EditDeviceModal onClose={() => toggleModal(EDIT)} />}
      {isModalOpen[DELETE] && (
        <DeleteDeviceModal
          deviceName={deviceToEdit?.[SYSTEM_NAME]}
          onClose={() => toggleModal(DELETE)}
          onCancel={handleDeleteCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
