import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CapturePage from './pages/CapturePage'
import AskPage from './pages/AskPage'
import DashboardPage from './pages/DashboardPage'
import { useUserContext } from './context/UserContext'

// Guard component that restricts dashboard access strictly to Manager persona
const ManagerRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { persona } = useUserContext()

  if (!persona) {
    return <Navigate to="/login" replace />
  }

  if (persona.type !== 'manager') {
    const fallbackRoute = 
      (persona.type === 'current_employee' || persona.type === 'departing') 
        ? '/capture' 
        : '/ask'
    return <Navigate to={fallbackRoute} replace />
  }

  return children
}

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/capture" element={<CapturePage />} />
      <Route path="/ask" element={<AskPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ManagerRoute>
            <DashboardPage />
          </ManagerRoute>
        } 
      />
      {/* Root redirects to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Fallback for unknown paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
