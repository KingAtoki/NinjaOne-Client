import PropTypes from 'prop-types';

import { Popover } from "../Popover"

import ThreeDotIcon from '../../assets/three-dot.svg';

import './index.css';

export const EditDeleteButton = ({ onEdit, onDelete }) => {
    const content = (
        <div className="edit-delete-content">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
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
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};  