
import PropTypes from 'prop-types';

import { useModal } from '../../contexts/ModalContext';
import { DELETE } from '../../constants';

import './index.css'

/**
 * FooterActions Component
 * 
 * @param {Function} props.onCancel - Handler function for cancel button click
 * @param {Function} props.onContinue - Handler function for continue/delete button click
 * 
 * @returns {JSX.Element} A div containing right aligned cancel and continue/delete buttons
 * 
 * @component
 * @description
 * Renders two buttons:
 * 1. Cancel button - Always displays "Cancel"
 * 2. Continue button - Displays either "Submit" or "Delete" based on context
 * 
 * The continue button's appearance changes when used in a delete modal,
 * typically showing a different color to indicate destructive action.
 */
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