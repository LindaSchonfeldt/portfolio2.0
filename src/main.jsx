import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import { initWebVitals } from './utils/webVitals.js'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Initialize Web Vitals monitoring after the page loads
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => initWebVitals())
} else {
  setTimeout(() => initWebVitals(), 1000)
}
