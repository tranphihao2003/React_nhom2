import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CAlert,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
// api
import * as API_Customers from '../../services/API/API_Customers'
// router
import { useNavigate } from 'react-router-dom'

const CustomerAdd = () => {
  const navigate = useNavigate() // Sử dụng đúng tên hàm navigate
  const [status, setStatus] = useState(null)
  const [validated, setValidated] = useState(false)
  const [count, setCount] = useState(0)

  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Email: '',
    Phone: '',
    Address: '',
  })

  useEffect(() => {
    document.title = 'Thêm khách hàng'
  }, [count])

  function create() {
    API_Customers.createCustomers(formData)
      .then((response) => {
        setStatus(true)
        setTimeout(() => {
          navigate('/Customers')
        }, 700)
      })
      .catch((error) => {
        setStatus(false)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      create()
    }
    setValidated(true)
    setCount(count + 1)
  }

  return (
    <CCard>
      <CCardHeader>
        <h3>Thêm cửa hàng</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Thêm khách hàngthất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Thêm khách hàng thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="First_Name">
              <strong>Tên khách hàng</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Nhập tên khách hàng"
              autoComplete="First_Name"
              required
              name="First_Name"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập tên khách hàng"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Last_Name">
              <strong>Nhập họ khách hàng</strong>
            </CFormLabel>
            <CFormInput
              required
              type="text"
              id="Last_Name"
              name="Last_Name"
              onChange={handleChange}
              placeholder="Nhập họ khách hàng "
              feedbackInvalid="Vui lòng nhập họ khách hàng"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Email">
              <strong>Email</strong>
            </CFormLabel>
            <CFormInput
              required
              type="tel"
              id="Email"
              name="Email"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập email"
              placeholder="Nhập số điện email"
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="Phone">
              <strong>Số điện thoại</strong>
            </CFormLabel>
            <CFormInput
              pattern="[0-9]{10}"
              required
              type="tel"
              id="Phone"
              name="Phone"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập số điện thoại"
              placeholder="Nhập số điện thoại"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Address">
              <strong>Địa chỉ</strong>
            </CFormLabel>
            <CFormInput
              required
              type="tel"
              id="Address"
              name="Address"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập địa chỉ"
              placeholder="Nhập địa chỉ"
            />
          </CCol>
          <CCol md={12}>
            <CButton color="primary" type="submit">
              Thêm khách hàng
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default CustomerAdd
