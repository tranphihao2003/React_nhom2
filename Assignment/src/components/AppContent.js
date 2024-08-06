import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import { PrivateRoutes, PublicRoutes } from '../routes'
import ProtectedRoute from '../utils/ProtectedRoute'

import { AuthProvider } from '../contexts/AuthContext'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <AuthProvider>
          <Routes>
            {PublicRoutes.map((route, idx) => {
              
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={
                      <ProtectedRoute requiredRole={route.requiredRole}>
                        <route.element />
                      </ProtectedRoute>
                    }
                  />
                )
              )
            })}

            <Route path="/" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
