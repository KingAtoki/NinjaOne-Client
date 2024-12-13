import PropTypes from 'prop-types';

import { Popover } from "../Popover"
import { useModal } from '../../contexts/ModalContext';
import ThreeDotIcon from '../../assets/three-dot.svg';

import './index.css';
import { DELETE, EDIT } from '../../constants';

export const EditDeleteButton = ({ deviceId = null }) => {
    const { toggleModal } = useModal()

    const openEditModal = () => {
        toggleModal(EDIT, deviceId)
    }
    const openDeleteModal = () => {
        toggleModal(DELETE, deviceId)
    }

    const content = (
        <div className="edit-delete-content">
            <button onClick={openEditModal}>Edit</button>
            <button onClick={openDeleteModal}>Delete</button>
        </div>
    );
    return (
        <div className="edit-delete-button">
            <Popover content={content}>
                <button>
                    <img src={ThreeDotIcon} alt='three-dots' />
                </button>
            </Popover>
        </div>
    )
}

EditDeleteButton.propTypes = {
    deviceId: PropTypes.number,
};  