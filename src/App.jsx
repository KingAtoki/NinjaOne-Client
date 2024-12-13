import { useState } from 'react';

import NinjaOneLogo from './assets/ninjaone-logo.svg'
import plus from './assets/plus.svg'
import { DevicesTable } from './components/DevicesTable';
import { TableActions } from './components/TableActions';
import { ADD, ALL, NAME_DESC } from './constants';
import { useDevices } from './contexts/DevicesContext';
import { useModal } from './contexts/ModalContext';
import { ModalManager } from './components/ModalManager';

import './App.css'

function App() {
  const [filter, setFilter] = useState('')
  const [deviceType, setDeviceType] = useState(ALL)
  const [sortMethod, setSortMethod] = useState(NAME_DESC)
  const { toggleModal } = useModal()
  const { devices } = useDevices()

  const onRefresh = () => {
    setFilter('')
    setDeviceType(ALL)
    setSortMethod(NAME_DESC)
  }

  const openAddModal = () => {
    toggleModal(ADD)
  }

  return (
    <div className="app">
      <ModalManager />
      <header className="global-header">
        <img src={NinjaOneLogo} className="app-logo" alt="logo" />
      </header>
      <div className='devices-header'>
        <h2 className='devices-header_title'>Devices</h2>
        <button className='devices-header_add-device' onClick={openAddModal}>
          <img src={plus} className="plus-icon" alt="plus" />
          Add device
        </button>
      </div>
      <TableActions
        filter={filter}
        setFilter={setFilter}
        deviceType={deviceType}
        setDeviceType={setDeviceType}
        sortMethod={sortMethod}
        setSortMethod={setSortMethod}
        onRefresh={onRefresh}
      />
      <DevicesTable devices={devices} />
    </div>
  )
}

export default App
