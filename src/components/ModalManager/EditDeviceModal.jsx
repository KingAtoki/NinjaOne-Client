import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import { AddEditForm } from '../AddEditForm';

export const EditDeviceModal = ({ onClose }) => (
    <Modal title="Edit device" onClose={onClose}>
        <AddEditForm />
    </Modal>
);

EditDeviceModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};  