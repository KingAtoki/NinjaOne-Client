import { useState } from 'react';
import PropTypes from 'prop-types';

import './index.css';

export const Popover = ({ content, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="popover-container"
            onClick={() => setIsOpen(true)}
            onMouseLeave={() => {
                setIsOpen(false);
            }}
        >
            {children}
            {isOpen && (
                <div
                    className="popover"
                    onMouseLeave={() => {
                        setIsOpen(false);
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    )
}


Popover.propTypes = {
    content: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};
