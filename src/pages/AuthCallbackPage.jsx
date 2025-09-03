// src/pages/AuthCallbackPage.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import apiService from '../services/apiService'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setUser, setIsAuthenticated } = useAuth()
  const [status, setStatus] = useState('processing') // processing, success, error

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // URL에서 토큰과 사용자 정보 추출
        const accessToken = searchParams.get('access_token')
        const refreshToken = searchParams.get('refresh_token')
        const userParam = searchParams.get('user')
        const error = searchParams.get('error')

        // 에러가 있는 경우
        if (error) {
          console.error('소셜 로그인 에러:', error)
          setStatus('error')
          setTimeout(() => {
            navigate('/login?error=' + encodeURIComponent(error))
          }, 2000)
          return
        }

        // 토큰이 없는 경우
        if (!accessToken || !refreshToken || !userParam) {
          console.error('필수 파라미터가 누락되었습니다')
          setStatus('error')
          setTimeout(() => {
            navigate('/login?error=auth_failed')
          }, 2000)
          return
        }

        // 사용자 정보 파싱
        const user = JSON.parse(decodeURIComponent(userParam))

        // 토큰을 localStorage에 저장
        apiService.setTokens(accessToken, refreshToken)
        
        // 사용자 정보를 localStorage에 저장
        localStorage.setItem('user', JSON.stringify(user))

        // AuthContext 상태 업데이트
        setUser(user)
        setIsAuthenticated(true)

        setStatus('success')
        
        // 성공 메시지 후 메인 페이지로 리다이렉트
        setTimeout(() => {
          navigate('/')
        }, 1500)

      } catch (error) {
        console.error('인증 콜백 처리 중 오류:', error)
        setStatus('error')
        setTimeout(() => {
          navigate('/login?error=auth_processing_failed')
        }, 2000)
      }
    }

    handleAuthCallback()
  }, [searchParams, navigate, setUser, setIsAuthenticated])

  const getStatusMessage = () => {
    switch (status) {
      case 'processing':
        return {
          title: '로그인 처리 중...',
          message: '소셜 로그인을 완료하는 중입니다.',
          color: 'text-blue-600'
        }
      case 'success':
        return {
          title: '로그인 성공!',
          message: '메인 페이지로 이동합니다.',
          color: 'text-green-600'
        }
      case 'error':
        return {
          title: '로그인 실패',
          message: '로그인 페이지로 돌아갑니다.',
          color: 'text-red-600'
        }
      default:
        return {
          title: '처리 중...',
          message: '잠시만 기다려주세요.',
          color: 'text-gray-600'
        }
    }
  }

  const statusInfo = getStatusMessage()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
        {/* 로딩 스피너 또는 상태 아이콘 */}
        <div className="mb-6">
          {status === 'processing' && (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" color="orange" />
            </div>
          )}
          {status === 'success' && (
            <div className="text-green-500 text-5xl mb-2">✅</div>
          )}
          {status === 'error' && (
            <div className="text-red-500 text-5xl mb-2">❌</div>
          )}
        </div>

        {/* 상태 메시지 */}
        <h2 className={`text-2xl font-bold mb-4 ${statusInfo.color}`}>
          {statusInfo.title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {statusInfo.message}
        </p>

        {/* 진행률 표시 (처리 중일 때만) */}
        {status === 'processing' && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '100%' }}
            />
          </div>
        )}

        {/* 수동 링크 (에러 시) */}
        {status === 'error' && (
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200"
          >
            로그인 페이지로 돌아가기
          </button>
        )}
      </div>
    </div>
  )
}

export default AuthCallbackPage