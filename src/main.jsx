import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import App from './App.jsx'
import { ModalProvider } from './contexts/ModalContext.jsx'
import { DevicesProvider } from './contexts/DevicesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DevicesProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </DevicesProvider>
  </StrictMode>,
)
