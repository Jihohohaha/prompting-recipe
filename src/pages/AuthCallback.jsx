// src/pages/AuthCallback.jsx (기존에 AuthCallbackPage.jsx로 명명된 경우 파일명 변경 필요)
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from '../components/common/LoadingScreen'

const AuthCallback = () => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const searchParams = new URLSearchParams(search)
        const accessToken = searchParams.get('access_token')
        const refreshToken = searchParams.get('refresh_token')
        const userJson = searchParams.get('user')

        // 필수 파라미터가 모두 존재하는지 확인
        if (accessToken && refreshToken && userJson) {
          try {
            // URL 디코딩 후 사용자 정보 파싱
            const user = JSON.parse(decodeURIComponent(userJson))

            // AuthContext의 login 메서드를 통해 토큰과 사용자 정보 저장
            await login(accessToken, refreshToken, user)

            console.log('OAuth 로그인 성공:', user.name)
            
            // 메인 페이지로 리다이렉트 (쿼리스트링 제거)
            navigate('/', { replace: true })
          } catch (parseError) {
            console.error('사용자 정보 파싱 실패:', parseError)
            navigate('/login?error=invalid_user_data', { replace: true })
          }
        } else {
          // 토큰이나 사용자 정보가 없는 경우
          const errorType = searchParams.get('error') || 'missing_required_tokens'
          console.error('OAuth 콜백 오류:', errorType)
          navigate(`/login?error=${encodeURIComponent(errorType)}`, { replace: true })
        }
      } catch (error) {
        console.error('OAuth 콜백 처리 중 오류 발생:', error)
        navigate('/login?error=callback_processing_failed', { replace: true })
      }
    }

    handleOAuthCallback()
  }, [search, navigate, login])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingScreen />
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            로그인 처리 중...
          </h2>
          <p className="text-gray-500">
            잠시만 기다려주세요.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthCallback