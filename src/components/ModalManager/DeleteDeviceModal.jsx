import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import { FooterActions } from '../FooterActions';

export const DeleteDeviceModal = ({ deviceName, onClose, onCancel, onDelete }) => (
    <Modal title="Delete device?" onClose={onClose}>
        <span className="delete-modal-text">
            You are about to delete the device <strong>{deviceName}</strong>. This action cannot be undone.
        </span>
        <FooterActions onCancel={onCancel} onContinue={onDelete} />
    </Modal>
);

DeleteDeviceModal.propTypes = {
    deviceName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}; 