import PropTypes from 'prop-types';

import { Popover } from "../Popover"
import { useModal } from '../../contexts/ModalContext';
import ThreeDotIcon from '../../assets/three-dot.svg';

import './index.css';
import { DELETE, EDIT } from '../../constants';

/**
 * EditDeleteButton Component
 * 
 * @param {string|null} props.deviceId - ID of the device to edit/delete
 * 
 * @returns {JSX.Element} A button wrapped in a popover with edit/delete options
 * 
 * @component
 * @description
 * Renders a three-dot menu button that, when clicked, shows a popover with
 * edit and delete options. When either option is selected, it opens the
 * corresponding modal and passes the deviceId.
 */
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
        <div className="edit-delete-button" data-testid='edit-delete-button'>
            <Popover content={content}>
                <button>
                    <img src={ThreeDotIcon} alt='three-dots' />
                </button>
            </Popover>
        </div>
    )
}

EditDeleteButton.propTypes = {
    deviceId: PropTypes.string,
};  