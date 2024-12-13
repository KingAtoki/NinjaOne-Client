import { useState } from 'react';

import { DevicesTable } from './components/DevicesTable';
import { TableActions } from './components/TableActions';
import { ALL, NAME_DESC } from './constants';

import NinjaOneLogo from './assets/ninjaone-logo.svg'
import plus from './assets/plus.svg'

import './App.css'

const testDevices = [
  {
    id: 1,
    system_name: 'DESKTOP-ONE',
    type: 'WINDOWS',
    hdd_capacity: '92',
  },
  {
    id: 2,
    system_name: 'DESKTOP-TWO',
    type: 'MAC',
    hdd_capacity: '256',
  },
  {
    id: 3,
    system_name: 'DESKTOP-THREE',
    type: 'LINUX',
    hdd_capacity: '512',
  },
]

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
      <DevicesTable devices={testDevices} />
    </div>
  )
}

export default App
