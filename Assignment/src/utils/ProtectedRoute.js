import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    // Show a loading indicator while verifying token
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requiredRole && !requiredRole.includes(user.role) && requiredRole.length <= 0) {
    return <div>Bạn Không có quyền truy cập</div>
  }

  return children
}

export default ProtectedRoute
