// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
// 페이지 import
import MainPage from '../pages/MainPage'
import SelectField from '../pages/SelectField'
import SelectAI from '../pages/SelectAI'
import Study from '../pages/SelectAI/Study'
import Art from '../pages/SelectAI/Art'
import Search from '../pages/SelectAI/Search'
import TutorialGPT from '../pages/TutorialGPT'
import ChatGPTTutorial from '../pages/ChatGPTTutorial'
import Information from '../pages/Community/Information'
import Creation from '../pages/Community/Creation'
import LoginPage from '../pages/LoginPage'
import MyPage from '../pages/MyPage'
import AuthCallbackPage from '../pages/AuthCallbackPage'

// 로그인 필수 페이지 (개인화 기능이 필요한 페이지들)
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

// 로그인된 사용자가 로그인 페이지 접근 시 메인으로 리다이렉트
const PublicRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}

const AppRouter = ({ isAuthenticated }) => {
  return (
    <Routes>
      {/* 로그인 페이지 */}
      <Route 
        path="/login" 
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <LoginPage />
          </PublicRoute>
        } 
      />

      {/* 소셜 로그인 콜백 페이지 */}
      <Route 
        path="/auth/callback" 
        element={<AuthCallbackPage />} 
      />

      {/* 공개 페이지들 (로그인 없이도 접근 가능) */}
      <Route path="/" element={<MainPage />} />
      <Route path="/select-field" element={<SelectField />} />
      <Route path="/select-ai" element={<SelectAI />} />
      <Route path="/select-ai/study" element={<Study />} />
      <Route path="/select-ai/art" element={<Art />} />
      <Route path="/select-ai/search" element={<Search />} />
      <Route path="/tutorial-gpt" element={<TutorialGPT />} />
      <Route path="/chatgpt-tutorial" element={<ChatGPTTutorial />} />
      <Route path="/community/information" element={<Information />} />
      <Route path="/community/creation" element={<Creation />} />

      {/* 로그인 필수 페이지들 (개인화 기능) */}
      <Route 
        path="/mypage" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MyPage />
          </ProtectedRoute>
        } 
      />

      {/* 404 페이지 또는 기본 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter