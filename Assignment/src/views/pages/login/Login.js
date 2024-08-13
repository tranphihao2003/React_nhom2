import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as API_Store from '../../../services/API/API_Store'
import { UserLogin } from '../../../services/API/API_User'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilAlbum, cilHome } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [Store, setStore] = useState([])
  const [alert, setAlert] = useState({ type: '', message: '' })

  useEffect(() => {
    document.title = 'Đăng nhập'
    getStore()
  }, [])

  function login(data) {
    UserLogin(data).then((response) => {
      console.log(response.message)

      if (response.token) {
        setAlert({ type: 'success', message: 'Đăng nhập thành công' })
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.account))
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        setAlert({ type: 'danger', message: response.message })
      }
    })
  }

  async function getStore() {
    let response = await API_Store.getStore(1, 100)
    let { data: store } = response
    setStore(store.stores)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {alert.message && (
                    <div className={`alert alert-${alert.type}`} role="alert">
                      {alert.message}
                    </div>
                  )}
                  <CForm onSubmit={handleSubmit(login)}>
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
                        {...register('username', { required: 'Vui lòng nhập tài khoản' })}
                        name="username"
                        invalid={!!errors.username}
                        feedbackInvalid={errors.username && errors.username?.message}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
                        invalid={!!errors.password}
                        feedbackInvalid={errors.password && errors.password?.message}
                        name="password"
                      />
                    </CInputGroup>{' '}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilHome} />
                      </CInputGroupText>
                      <CFormSelect
                        placeholder="Chọn Cửa Hàng"
                        {...register('store', { required: 'Vui lòng chọn cửa hàng' })}
                        invalid={!!errors.store}
                        feedbackInvalid={errors.store && errors.store?.message}
                        name="store"
                        options={[
                          { value: '', label: 'Chọn cửa hàng' },
                          ...Store.map((store) => {
                            return { value: store.Store_ID, label: store.Store_Name }
                          }),
                        ]}
                      />
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
