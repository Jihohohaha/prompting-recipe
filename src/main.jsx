import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/tailwind.css'
import './styles/index.css' // 이 라인 확인

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)