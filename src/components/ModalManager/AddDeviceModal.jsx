import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import { AddEditForm } from '../AddEditForm';

export const AddDeviceModal = ({ onClose }) => (
    <Modal title="Add device" onClose={onClose}>
        <AddEditForm />
    </Modal>
);

AddDeviceModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};  