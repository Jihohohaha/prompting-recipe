// src/App.jsx (인증 시스템 적용)
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import LoadingScreen from './components/common/LoadingScreen'

// 인증 상태에 따른 라우팅 처리
function AuthenticatedApp() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  return <AppRouter isAuthenticated={isAuthenticated} />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AuthenticatedApp />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App