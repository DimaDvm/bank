import React from 'react'
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'

const metaTag = document.createElement('meta');
metaTag.httpEquiv = 'Permissions-Policy';
metaTag.content = 'interest-cohort=()';
document.head.appendChild(metaTag);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
