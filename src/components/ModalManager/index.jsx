import { ADD, DELETE, EDIT, SYSTEM_NAME } from "../../constants"
import { useDevices } from "../../contexts/DevicesContext"
import { useModal } from "../../contexts/ModalContext"
import { AddEditForm } from "../AddEditForm"
import { FooterActions } from "../FooterActions"
import { Modal } from "../Modal"

import './index.css'

export const ModalManager = () => {
    const { isModalOpen, toggleModal } = useModal()
    const { deviceIdToEdit, deviceToEdit, removeDevice } = useDevices()

    return (
        <div>
            {isModalOpen[ADD] &&
                <Modal
                    title='Add device'
                    onClose={() => toggleModal(ADD)}
                    cancelBtnProps={{
                        text: 'Cancel',
                        onCancel: () => toggleModal(ADD)
                    }}
                    continueBtnProps={{
                        text: 'Submit',
                        onContinue: () => console.log('Submitted')
                    }}
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
