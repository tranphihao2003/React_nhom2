import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    // Show a loading indicator while verifying the token
    return <div>Loading...</div>
  }

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />
  }

  
  if (requiredRole && requiredRole.length > 0 && !requiredRole.includes(user?.role)) {
  
    return <div>Bạn không có quyền truy cập</div>
  }

  // If the user is authenticated and has the required role, render the children components
  return children
}

export default ProtectedRoute
