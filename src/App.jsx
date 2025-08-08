// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import './styles/App.css'

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App