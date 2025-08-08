// src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom'

// 페이지 import
import Home from '../pages/Home'
import SelectField from '../pages/SelectField'
import SelectAI from '../pages/SelectAI'
import Study from '../pages/SelectAI/Study'
import Art from '../pages/SelectAI/Art'
import Search from '../pages/SelectAI/Search'
import TutorialGPT from '../pages/TutorialGPT'
import Information from '../pages/Community/Information'
import Creation from '../pages/Community/Creation'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select-field" element={<SelectField />} />

      <Route path="/select-ai" element={<SelectAI />} >
        <Route path="study" element={<Study />} />
        <Route path="art" element={<Art />} />
        <Route path="search" element={<Search />} />
      </Route>

      <Route path="/tutorial-gpt" element={<TutorialGPT />} />
      
      <Route path="/community/information" element={<Information />} />
      <Route path="/community/creation" element={<Creation />} />
    </Routes>
  )
}

export default AppRouter