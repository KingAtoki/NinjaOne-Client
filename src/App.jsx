import NinjaOneLogo from './assets/ninjaone-logo.svg'
import plus from './assets/plus.svg'
import './App.css'

function App() {

  return (
    <div className="app">
      <header className="global-header">
        <img src={NinjaOneLogo} className="app-logo" alt="logo" />
      </header>
      <div className='devices-header'>
        <h2 className='devices-header_title'>Devices</h2>
        <button className='devices-header_add-device'><img src={plus} className="plus-icon" alt="plus" />Add device</button>
      </div>
    </div>
  )
}

export default App
