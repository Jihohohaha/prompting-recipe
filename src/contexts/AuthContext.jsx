// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/apiService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // 앱 시작 시 토큰이 있으면 사용자 정보 가져오기
  useEffect(() => {
    const initAuth = async () => {
      const token = apiService.getToken()
      const savedUser = localStorage.getItem('user')

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          setIsAuthenticated(true)

          // 서버에서 최신 사용자 정보 가져오기
          const currentUser = await apiService.getCurrentUser()
          setUser(currentUser)
          localStorage.setItem('user', JSON.stringify(currentUser))
        } catch (error) {
          console.error('사용자 정보 가져오기 실패:', error)
          await logout()
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // 로그인 함수
  const login = async (credentials) => {
    try {
      setIsLoading(true)
      setError(null)

      const data = await apiService.login(credentials)
      setUser(data.user)
      setIsAuthenticated(true)

      return data
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // 회원가입 함수
  const register = async (userData) => {
    try {
      setIsLoading(true)
      setError(null)

      const data = await apiService.register(userData)
      
      // 회원가입 후 자동 로그인이 없으므로 수동 로그인 필요
      setIsLoading(false)
      return data
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // 로그아웃 함수
  const logout = async () => {
    try {
      apiService.clearTokens()
    } catch (error) {
      console.error('로그아웃 오류:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      setError(null)
    }
  }

  // 이메일 인증 관련
  const sendVerificationEmail = async (email) => {
    try {
      setError(null)
      return await apiService.sendVerificationEmail(email)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const checkVerificationCode = async (email, code) => {
    try {
      setError(null)
      return await apiService.checkVerificationCode(email, code)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    sendVerificationEmail,
    checkVerificationCode
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}