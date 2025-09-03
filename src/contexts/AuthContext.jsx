// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import apiService from '../services/apiService'

// 초기 상태 정의
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  refreshToken: null
}

// 액션 타입 정의
const ActionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR'
}

// 리듀서 함수
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false
      }
    
    case ActionTypes.LOGOUT:
      return {
        ...initialState,
        isLoading: false
      }
    
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    
    case ActionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    
    case ActionTypes.AUTH_ERROR:
      return {
        ...initialState,
        isLoading: false
      }
    
    default:
      return state
  }
}

// AuthContext 생성
const AuthContext = createContext()

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // 토큰을 localStorage에 저장하는 함수
  const saveTokensToStorage = (accessToken, refreshToken, user) => {
    try {
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.error('토큰 저장 실패:', error)
    }
  }

  // 토큰을 localStorage에서 불러오는 함수
  const loadTokensFromStorage = () => {
    try {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')
      const userStr = localStorage.getItem('user')
      
      if (accessToken && refreshToken && userStr) {
        const user = JSON.parse(userStr)
        return { accessToken, refreshToken, user }
      }
    } catch (error) {
      console.error('토큰 로드 실패:', error)
    }
    return null
  }

  // 토큰을 localStorage에서 제거하는 함수
  const clearTokensFromStorage = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
  }

  // 로그인 함수 (OAuth 및 일반 로그인 모두 지원)
  const login = async (accessToken, refreshToken, user) => {
    try {
      // 토큰을 localStorage에 저장
      saveTokensToStorage(accessToken, refreshToken, user)
      
      // API 서비스에 토큰 설정
      apiService.setAuthToken(accessToken)
      
      // 상태 업데이트
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: { accessToken, refreshToken, user }
      })

      return { success: true }
    } catch (error) {
      console.error('로그인 처리 실패:', error)
      return { success: false, error: error.message }
    }
  }

  // 로그아웃 함수
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청 (리프레시 토큰 무효화)
      if (state.refreshToken) {
        await apiService.post('/auth/logout', {
          refreshToken: state.refreshToken
        })
      }
    } catch (error) {
      console.error('서버 로그아웃 요청 실패:', error)
    } finally {
      // 로컬 스토리지 및 상태 초기화
      clearTokensFromStorage()
      apiService.clearAuthToken()
      dispatch({ type: ActionTypes.LOGOUT })
    }
  }

  // 토큰 갱신 함수
  const refreshAccessToken = async () => {
    try {
      if (!state.refreshToken) {
        throw new Error('리프레시 토큰이 없습니다')
      }

      const response = await apiService.post('/auth/refresh', {
        refreshToken: state.refreshToken
      })

      const { accessToken, refreshToken: newRefreshToken } = response.data

      // 새 토큰으로 업데이트
      saveTokensToStorage(accessToken, newRefreshToken, state.user)
      apiService.setAuthToken(accessToken)
      
      dispatch({
        type: ActionTypes.REFRESH_TOKEN_SUCCESS,
        payload: { accessToken, refreshToken: newRefreshToken }
      })

      return accessToken
    } catch (error) {
      console.error('토큰 갱신 실패:', error)
      dispatch({ type: ActionTypes.AUTH_ERROR })
      clearTokensFromStorage()
      return null
    }
  }

  // OAuth 로그인 URL 생성 함수
  const getOAuthLoginUrl = (provider) => {
    const baseUrl = apiService.getBaseUrl()
    return `${baseUrl}/auth/${provider}`
  }

  // 컴포넌트 마운트 시 저장된 인증 정보 복원
  useEffect(() => {
    const initializeAuth = () => {
      const savedTokens = loadTokensFromStorage()
      
      if (savedTokens) {
        const { accessToken, refreshToken, user } = savedTokens
        apiService.setAuthToken(accessToken)
        
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: { accessToken, refreshToken, user }
        })
      } else {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false })
      }
    }

    initializeAuth()
  }, [])

  // Context 값
  const value = {
    // 상태
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    
    // 함수들
    login,
    logout,
    refreshAccessToken,
    getOAuthLoginUrl
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Context를 사용하는 훅
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다')
  }
  return context
}

export default AuthContext