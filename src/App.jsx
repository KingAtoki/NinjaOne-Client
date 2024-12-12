import { useState } from 'react';

import { TableActions } from './components/TableActions';
import { ALL, NAME_DESC } from './constants';

import NinjaOneLogo from './assets/ninjaone-logo.svg'
import plus from './assets/plus.svg'

import './App.css'

function App() {
  const [filter, setFilter] = useState('')
  const [deviceType, setDeviceType] = useState(ALL)
  const [sortMethod, setSortMethod] = useState(NAME_DESC)

  const onRefresh = () => {
    setFilter('')
    setDeviceType(ALL)
    setSortMethod(NAME_DESC)
  }

  return (
    <div className="app">
      <header className="global-header">
        <img src={NinjaOneLogo} className="app-logo" alt="logo" />
      </header>
      <div className='devices-header'>
        <h2 className='devices-header_title'>Devices</h2>
        <button className='devices-header_add-device'><img src={plus} className="plus-icon" alt="plus" />Add device</button>
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
    </div>
  )
}

export default App
