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
import AuthCallback from '../pages/AuthCallback'  // 새로 추가된 콜백 페이지
import Community from '../pages/Community/Community'
import MonthlyPrompting from '../pages/Community/MonthlyPrompting'
import AIArticles from '../pages/Community/AIArticles'
import AIGallery from '../pages/Community/AIGallery'

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

      {/* OAuth 콜백 페이지 - 새로 추가 */}
      <Route 
        path="/auth/callback" 
        element={<AuthCallback />} 
      />

      {/* 공개 페이지들 (로그인 없이도 접근 가능) - 기존과 동일 */}
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
      {/* 새로운 커뮤니티 페이지들 */}
      <Route path="/community" element={<Community />} />
      <Route path="/community/monthly-prompting" element={<MonthlyPrompting />} />
      <Route path="/community/ai-articles" element={<AIArticles />} />
      <Route path="/community/ai-gallery" element={<AIGallery />} />
      {/* 로그인 필수 페이지들 (개인화 기능만) */}
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