
import PropTypes from 'prop-types';

import { useModal } from '../../contexts/ModalContext';
import { DELETE } from '../../constants';

import './index.css'

export const FooterActions = ({ onCancel, onContinue }) => {
    const { isModalOpen } = useModal();
    const isDeleteModalOpen = isModalOpen[DELETE];


    return (
        <div className="footer-actions">
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
            <button
                className={`continue-button ${isDeleteModalOpen && 'isDelete'}`}
                onClick={onContinue}
            >
                {isDeleteModalOpen ? 'Delete' : 'Submit'}
            </button>
        </div>
    )
}

FooterActions.propTypes = {
    onContinue: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};             