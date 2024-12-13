import { ADD, DELETE, EDIT, SYSTEM_NAME } from "../../constants"
import { useDevices } from "../../contexts/DevicesContext"
import { useModal } from "../../contexts/ModalContext"
import { AddEditForm } from "../AddEditForm"
import { Modal } from "../Modal"

import './index.css'

export const ModalManager = () => {
    const { isModalOpen, toggleModal } = useModal()
    const { editDevice, deviceToEdit } = useDevices()

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
                    cancelBtnProps={{
                        text: 'Cancel',
                        onCancel: () => {
                            toggleModal(EDIT)
                            editDevice(null)
                        }
                    }}
                    continueBtnProps={{
                        text: 'Submit',
                        onContinue: () => console.log('Submitted')
                    }}
                >
                    <AddEditForm />
                </Modal>
            }
            {isModalOpen[DELETE] &&
                <Modal
                    title='Delete device?'
                    onClose={() => toggleModal(DELETE)}
                    cancelBtnProps={{
                        text: 'Cancel',
                        onCancel: () => {
                            toggleModal(DELETE)
                        }
                    }}
                    continueBtnProps={{
                        text: 'Delete',
                        onContinue: () => {
                            console.log('Delete')
                            editDevice(null)
                        },
                        isDelete: true
                    }}
                >
                    <span className="delete-modal-text">You are about to delete the device <strong>{deviceToEdit?.[SYSTEM_NAME]}</strong>. This action cannot be undone.</span>                </Modal>
            }

        </div>
    )
}
