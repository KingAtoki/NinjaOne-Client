import { createContext, useState, useContext } from 'react';
import { ADD, DELETE, EDIT } from '../constants';
import { useDevices } from './DevicesContext';

/**
 * @typedef {Object} ModalContextType
 * @property {Object} isModalOpen - Object tracking open state of each modal type
 * @property {Function} toggleModal - Function to toggle modal visibility
 */

/**
 * Initial context value with default empty function
 * @type {ModalContextType}
 */
const ModalContext = createContext({
    isModalOpen: {},
    toggleModal: () => { },
});

/**
 * Initial state for modal visibility
 * @type {Object}
 * @property {boolean} ADD - Add modal visibility state
 * @property {boolean} EDIT - Edit modal visibility state
 * @property {boolean} DELETE - Delete modal visibility state
 */
const initialModalState = {
    [ADD]: false,
    [EDIT]: false,
    [DELETE]: false,
}

// eslint-disable-next-line react/prop-types
export function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(initialModalState);
    const { deviceIdToEdit } = useDevices()

    /**
     * Toggles modal visibility and handles device ID when needed
     * 
     * @function
     * @param {string} modal - Modal type to toggle (ADD, EDIT, or DELETE)
     * @param {string} [deviceId] - Optional device ID for edit/delete modals
     */
    const toggleModal = (modal, deviceId) => {
        const modalsWithDeviceId = [EDIT, DELETE]
        if (modalsWithDeviceId.includes(modal) && deviceId) {
            deviceIdToEdit(deviceId)
        }

        setIsModalOpen(prevIsModalOpen => ({
            ...initialModalState,
            [modal]: !prevIsModalOpen[modal],
        }));
    };

    const value = {
        isModalOpen,
        toggleModal,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}