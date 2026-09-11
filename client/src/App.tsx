import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CapturePage from './pages/CapturePage'
import AskPage from './pages/AskPage'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/capture" element={<CapturePage />} />
      <Route path="/ask" element={<AskPage />} />
      {/* Root redirects to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Fallback for unknown paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
