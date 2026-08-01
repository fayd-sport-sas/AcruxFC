// src/main.jsx - PUNTO DE ENTRADA DE REACT
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // ← Importa Tailwind

// Busca el elemento con id="root" en index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)