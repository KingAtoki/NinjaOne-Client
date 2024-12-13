import PropTypes from 'prop-types';

import CloseIcon from '../../assets/close.svg';

import './index.css';

export const Modal = ({ children, title, onClose, cancelBtnProps, continueBtnProps }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span>{title}</span>
                    <button className="close-button" onClick={onClose}>
                        <img src={CloseIcon} alt='close' />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="cancel-button" onClick={cancelBtnProps.onCancel}>{cancelBtnProps.text}</button>
                    <button className={`continue-button ${continueBtnProps.isDelete && 'isDelete'}`} onClick={continueBtnProps.onContinue}>{continueBtnProps.text}</button>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    cancelBtnProps: PropTypes.shape({
        text: PropTypes.string.isRequired,
        onCancel: PropTypes.func.isRequired,
    }).isRequired,
    continueBtnProps: PropTypes.shape({
        text: PropTypes.string.isRequired,
        onContinue: PropTypes.func.isRequired,
        isDelete: PropTypes.bool,
    }).isRequired,
};