import React from 'react'
import ReactDOM from 'react-dom/client'
// import ViteApp from './App-vite.tsx'n
import App from './App';
// import App from './AppOld'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
      {/* <ViteApp /> */}
  </React.StrictMode>,
)
