// src/services/apiService.js (수정된 버전)

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  }

  /**
   * 토큰 관리
   */
  getToken() {
    return localStorage.getItem('accessToken')
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  setTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken)
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  clearTokens() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  /**
   * HTTP 헤더 설정
   */
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (includeAuth) {
      const token = this.getToken()
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    return headers
  }

  /**
   * 기본 fetch 래퍼
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        ...this.getHeaders(options.auth !== false),
        ...options.headers
      },
      ...options
    }

    try {
      console.log(`API 요청: ${config.method || 'GET'} ${url}`)
      console.log('요청 데이터:', config.body) // 디버깅용
      
      const response = await fetch(url, config)
      
      console.log(`응답 상태: ${response.status}`)

      // 토큰 만료 시 자동 갱신
      if (response.status === 401 && options.auth !== false) {
        try {
          await this.refreshAccessToken()
          
          // 새로운 토큰으로 재시도
          config.headers.Authorization = `Bearer ${this.getToken()}`
          const retryResponse = await fetch(url, config)
          
          if (!retryResponse.ok) {
            throw new Error(`API 요청 실패: ${retryResponse.status}`)
          }
          
          return await retryResponse.json()
        } catch (refreshError) {
          this.clearTokens()
          window.location.href = '/login'
          throw refreshError
        }
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error('응답 에러 상세:', errorText) // 디버깅용
        console.error('응답 헤더:', [...response.headers.entries()]) // 헤더 정보
        
        let errorData = {}
        try {
          errorData = JSON.parse(errorText)
          console.error('파싱된 에러 데이터:', errorData)
        } catch (e) {
          console.error('응답을 JSON으로 파싱할 수 없음:', errorText)
          errorData = { message: errorText }
        }
        
        throw new Error(errorData.message || errorData.error || `API 요청 실패: ${response.status} - ${errorText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API 요청 오류:', error)
      throw error
    }
  }

  // === 인증 API ===

  /**
   * 이메일 인증 코드 발송
   */
  async sendVerificationEmail(email) {
    return await this.request('/auth/email/send-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
      auth: false
    })
  }

  /**
   * 이메일 인증 코드 확인
   */
  async checkVerificationCode(email, code) {
    return await this.request('/auth/email/check-verification', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
      auth: false
    })
  }

  /**
   * 회원가입
   */
  async register(userData) {
    const { name, email, loginId, password } = userData
    
    // 백엔드에서 password_hash로 받으므로 필드명 맞춤
    const requestData = {
      name,
      email, 
      loginId,
      password_hash: password
    }
    
    console.log('회원가입 요청 데이터:', requestData) // 디버깅용
    
    return await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(requestData),
      auth: false
    })
  }

  /**
   * 로그인
   */
  async login(credentials) {
    const { loginId, password } = credentials
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        loginId,
        password_hash: password
      }),
      auth: false
    })

    if (data.accessToken) {
      this.setTokens(data.accessToken, data.refreshToken)
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }
    }

    return data
  }

  /**
   * 토큰 갱신
   */
  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다')
    }

    try {
      const data = await this.request('/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        },
        auth: false
      })

      this.setTokens(data.accessToken, data.refreshToken)
      return data.accessToken
    } catch (error) {
      this.clearTokens()
      throw error
    }
  }

  /**
   * 사용자 프로필 조회
   */
  async getCurrentUser() {
    return await this.request('/auth/profile')
  }

  /**
   * 구글 로그인
   */
  async googleLogin() {
    window.location.href = `${this.baseURL}/auth/google`
  }

  /**
   * 카카오 로그인  
   */
  async kakaoLogin() {
    window.location.href = `${this.baseURL}/auth/kakao`
  }

  /**
   * 백엔드 연결 테스트
   */
  async testConnection() {
    try {
      const testEndpoints = ['/']

      for (const endpoint of testEndpoints) {
        try {
          console.log(`테스트 중: ${endpoint}`)
          const result = await this.request(endpoint, { method: 'GET', auth: false })
          console.log(`연결 성공: ${endpoint}`)
          return { success: true, endpoint, data: result }
        } catch (error) {
          console.log(`연결 실패: ${endpoint} - ${error.message}`)
          continue
        }
      }

      throw new Error('모든 엔드포인트 연결 실패')
    } catch (error) {
      console.error('백엔드 연결 테스트 실패:', error)
      return { success: false, error: error.message }
    }
  }
}

export default new ApiService()