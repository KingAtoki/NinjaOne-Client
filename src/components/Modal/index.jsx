import PropTypes from 'prop-types';

import CloseIcon from '../../assets/close.svg';

import './index.css';

export const Modal = ({ children, title, onClose }) => {
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
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};