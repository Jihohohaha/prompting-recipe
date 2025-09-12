// src/services/apiService.js
import axios from 'axios'

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    this.accessToken = null
    
    // Axios 인스턴스 생성
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // 요청 인터셉터 - 모든 요청에 토큰 자동 추가
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 응답 인터셉터 - 토큰 만료 처리
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config
        
        // 401 에러이고 재시도하지 않은 요청인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          try {
            // 토큰 갱신 시도
            const refreshToken = localStorage.getItem('refresh_token')
            if (refreshToken) {
              const response = await axios.post(`${this.baseURL}/auth/refresh`, {
                refreshToken: refreshToken
              })
              
              const { accessToken, refreshToken: newRefreshToken } = response.data
              
              // 새 토큰 저장 및 설정
              localStorage.setItem('access_token', accessToken)
              localStorage.setItem('refresh_token', newRefreshToken)
              this.setAuthToken(accessToken)
              
              // 원래 요청에 새 토큰 적용하여 재시도
              originalRequest.headers.Authorization = `Bearer ${accessToken}`
              return this.axiosInstance(originalRequest)
            }
          } catch (refreshError) {
            // 토큰 갱신 실패 시 로그아웃 처리
            this.clearAuthToken()
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
            
            // 로그인 페이지로 리다이렉트
            if (typeof window !== 'undefined') {
              window.location.href = '/login'
            }
            
            return Promise.reject(refreshError)
          }
        }
        
        return Promise.reject(error)
      }
    )
  }

  /**
   * 베이스 URL 반환
   */
  getBaseUrl() {
    return this.baseURL
  }

  /**
   * 인증 토큰 설정
   */
  setAuthToken(token) {
    this.accessToken = token
  }

  /**
   * 인증 토큰 제거
   */
  clearAuthToken() {
    this.accessToken = null
  }

  /**
   * GET 요청
   */
  async get(url, config = {}) {
    try {
      const response = await this.axiosInstance.get(url, config)
      return response
    } catch (error) {
      console.error(`GET ${url} 요청 실패:`, error)
      throw error
    }
  }

  /**
   * POST 요청
   */
  async post(url, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.post(url, data, config)
      return response
    } catch (error) {
      console.error(`POST ${url} 요청 실패:`, error)
      throw error
    }
  }

  /**
   * PUT 요청
   */
  async put(url, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.put(url, data, config)
      return response
    } catch (error) {
      console.error(`PUT ${url} 요청 실패:`, error)
      throw error
    }
  }

  /**
   * PATCH 요청
   */
  async patch(url, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.patch(url, data, config)
      return response
    } catch (error) {
      console.error(`PATCH ${url} 요청 실패:`, error)
      throw error
    }
  }

  /**
   * DELETE 요청
   */
  async delete(url, config = {}) {
    try {
      const response = await this.axiosInstance.delete(url, config)
      return response
    } catch (error) {
      console.error(`DELETE ${url} 요청 실패:`, error)
      throw error
    }
  }

  /**
   * 파일 업로드
   */
  async uploadFile(url, file, onProgress = null) {
    const formData = new FormData()
    formData.append('file', file)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress(percentCompleted)
      }
    }

    try {
      const response = await this.axiosInstance.post(url, formData, config)
      return response
    } catch (error) {
      console.error(`파일 업로드 실패:`, error)
      throw error
    }
  }

  /**
   * 사용자 정보 조회
   */
  async getCurrentUser() {
    return await this.get('/users/me')
  }

  /**
   * 사용자 프로필 업데이트
   */
  async updateUserProfile(userData) {
    return await this.patch('/users/me', userData)
  }

  /**
   * 튜토리얼 목록 조회
   */
  async getTutorials() {
    return await this.get('/tutorials')
  }

  /**
   * 특정 튜토리얼 조회
   */
  async getTutorial(id) {
    return await this.get(`/tutorials/${id}`)
  }

  /**
   * 사용자 진행상황 조회
   */
  async getUserProgress() {
    return await this.get('/user-progress')
  }

  /**
   * 사용자 진행상황 업데이트
   */
  async updateUserProgress(progressData) {
    return await this.post('/user-progress', progressData)
  }

  /**
   * 퀴즈 목록 조회
   */
  async getQuizzes() {
    return await this.get('/quizzes')
  }

  /**
   * 퀴즈 제출
   */
  async submitQuiz(quizId, answers) {
    return await this.post(`/quizzes/${quizId}/submit`, { answers })
  }

  // ==================== 갤러리 관련 API ====================

  /**
   * 갤러리 보드 목록 조회 (새로운 API 엔드포인트)
   * @param {number} page - 페이지 번호 (기본값: 1)
   * @param {number} limit - 페이지당 항목 수 (기본값: 10)
   */
  async getGalleryBoards(page = 1, limit = 10) {
    return await this.get(`/gallery-boards?page=${page}&limit=${limit}`)
  }

  /**
   * 최근 갤러리 이미지 조회 (기존 호환성을 위해 유지)
   */
  async getRecentGalleryImages() {
    // 새로운 API를 사용하되 첫 페이지만 가져옴
    return await this.getGalleryBoards(1, 10)
  }

  /**
   * 특정 갤러리 보드 조회
   */
  async getGalleryBoard(galleryBoardId) {
    return await this.get(`/gallery-boards/${galleryBoardId}`)
  }

  /**
   * 갤러리 보드 생성
   */
  async createGalleryBoard(galleryData) {
    return await this.post('/gallery-boards', galleryData)
  }

  /**
   * 갤러리 보드 수정
   */
  async updateGalleryBoard(galleryBoardId, galleryData) {
    return await this.put(`/gallery-boards/${galleryBoardId}`, galleryData)
  }

  /**
   * 갤러리 보드 삭제
   */
  async deleteGalleryBoard(galleryBoardId) {
    return await this.delete(`/gallery-boards/${galleryBoardId}`)
  }
}

// 싱글톤 패턴으로 인스턴스 생성
const apiService = new ApiService()

export default apiService