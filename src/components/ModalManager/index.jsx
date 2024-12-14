import { ADD, DELETE, EDIT, SYSTEM_NAME } from "../../constants"
import { useDevices } from "../../contexts/DevicesContext"
import { useModal } from "../../contexts/ModalContext"
import { AddEditForm } from "../AddEditForm"
import { FooterActions } from "../FooterActions"
import { Modal } from "../Modal"

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
    const { isModalOpen, toggleModal } = useModal()
    const { deviceIdToEdit, deviceToEdit, removeDevice } = useDevices()

    return (
        <div>
            {isModalOpen[ADD] &&
                <Modal
                    title='Add device'
                    onClose={() => toggleModal(ADD)}
                >
                    <AddEditForm />
                </Modal>
            }
            {isModalOpen[EDIT] &&
                <Modal
                    title='Edit device'
                    onClose={() => toggleModal(EDIT)}
                >
                    <AddEditForm />
                </Modal>
            }
            {isModalOpen[DELETE] &&
                <Modal
                    title='Delete device?'
                    onClose={() => toggleModal(DELETE)}

                >
                    <span className="delete-modal-text">
                        You are about to delete the device <strong>{deviceToEdit?.[SYSTEM_NAME]}</strong>. This action cannot be undone.
                    </span>
                    <FooterActions
                        onCancel={() => {
                            toggleModal(DELETE)
                            deviceIdToEdit(null)
                        }}
                        onContinue={() => {
                            removeDevice(deviceToEdit?.id)
                            toggleModal(DELETE)
                            deviceIdToEdit(null)
                        }}
                    />
                </Modal>
            }

        </div>
    )
}
