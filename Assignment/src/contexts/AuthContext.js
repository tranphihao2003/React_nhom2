import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserVerify } from '../services/API/API_User'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // New loading state
  
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await UserVerify(token)
          if (response.status === 200) {
            const data = await response.json()
            setUser(data.user) // Set user state if verification is successful
          } else {
            setUser(null) // Clear user state if verification fails
          }
        } catch (error) {
          console.error('Error verifying token:', error)
          setUser(null) // Clear user state on error
        }
      } else {
        setUser(null) // Clear user state if no token is present
      }
      setLoading(false) // Set loading to false once verification is done
    }

    checkToken()
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('token', userData.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
