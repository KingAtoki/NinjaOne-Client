import { createContext, useState, useContext } from 'react';
import { ADD, DELETE, EDIT } from '../constants';
import { useDevices } from './DevicesContext';

const ModalContext = createContext({
  isModalOpen: {},
  toggleModal: () => {},
});

const initialModalState = {
    [ADD]: false,
    [EDIT]: false,
    [DELETE]: false,
}

// eslint-disable-next-line react/prop-types
export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);
  const { editDevice } = useDevices()

  const toggleModal = (modal, deviceId) => {
    const modalsWithDeviceId = [EDIT, DELETE]
    if (modalsWithDeviceId.includes(modal) && deviceId) {
      editDevice(deviceId)
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