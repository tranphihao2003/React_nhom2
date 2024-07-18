import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import API_User from '../../../services/API/API_User'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilAlbum } from '@coreui/icons'

const Login = () => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
  })

  const [validated, setValidated] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)
  const [loginStatus, setLoginStatus] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target
    // Cập nhật state credentials với giá trị mới
    setAccount({
      ...account,
      [name]: value,
    })
  }
  useEffect(() => {
    if (validated) {
      const api = new API_User()
      api.login(account).then((response) => {
        if (response.token) {
          setLoginStatus('Đăng nhập thành công')
          localStorage.setItem('token', response.token)
          localStorage.setItem('user', JSON.stringify(response.user))
          window.location.href = '/'
        } else {
          setLoginStatus('Đăng nhập thất bại')
        }
      })
    }
  }, [submitCount])
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    setSubmitCount(submitCount + 1)
    console.log(submitCount)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {loginStatus === 'Đăng nhập thất bại' && (
                    <div className="alert alert-danger" role="alert">
                      Đăng nhập thất bại
                    </div>
                  )}
                  {loginStatus === 'Đăng nhập thành công' && (
                    <div className="alert alert-success" role="alert">
                      Đăng nhập thành công
                    </div>
                  )}
                  <CForm onSubmit={handleSubmit} noValidate validated={validated}>
                    <h1>Đăng Nhập</h1>
                    <p className="text-body-secondary">Đăng nhập vào tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Tài khoản"
                        autoComplete="username"
                        required
                        name="username"
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">Vui lòng nhập tài khoản.</div>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        required
                        name="password"
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">Vui lòng nhập mật khẩu.</div>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Đăng nhập
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <CIcon icon={cilAlbum} size="5xl" />
                    <h2>Tiệm Đĩa Thời Đại</h2>
                    <p>Cung cấp và phân phối các đĩa nhạc và Album chất lượng cao</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
