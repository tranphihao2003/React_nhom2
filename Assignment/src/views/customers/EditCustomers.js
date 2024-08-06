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
import * as API_Customers from '../../services/API/API_Customers'
import { useNavigate, useParams } from 'react-router-dom'

const CustomerEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [status, setStatus] = useState(null)
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Email: '',
    Phone: '',
    Address: '',
  })

  useEffect(() => {
    document.title = 'Sửa khách hàng'

    if (id) {
      API_Customers.getCustomersById(id)
        .then((response) => {
          const { data } = response
          setFormData(data[0])
        })
        .catch((error) => {
          console.error('Error fetching store data:', error)
          setStatus(false)
        })
    }
  }, [id])

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
      updateCustomers()
    }
    setValidated(true)
  }

  const updateCustomers = () => {
    API_Customers.updateCustomers({ ...formData, Customer_ID: id })
      .then((response) => {
        setStatus(true)
        setTimeout(() => {
          navigate('/Customers')
        }, 200)
      })
      .catch((error) => {
        console.error('Error updating store:', error)
        setStatus(false)
      })
  }

  return (
    <CCard>
      <CCardHeader>
        <h3>Sửa Khách hàng</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Sửa khách hàng thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Sửa khách hàng thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="First_Name">
              <strong>Tên Khách hàng</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Nhập tên khách hàng"
              autoComplete="First_Name"
              required
              name="First_Name"
              value={formData.First_Name}
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập tên khách hàng"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Last_Name">
              <strong>Họ khác hàng</strong>
            </CFormLabel>
            <CFormInput
              required
              type="text"
              id="Last_Name"
              name="Last_Name"
              value={formData.Last_Name}
              onChange={handleChange}
              placeholder="Nhập Họ"
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
              value={formData.Email}
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập email"
              placeholder="Nhập email"
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="Phone">
              <strong>Phone</strong>
            </CFormLabel>
            <CFormInput
              required
              type="text"
              id="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập Phone"
              placeholder="Nhập Phone"
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="Address">
              <strong>Address</strong>
            </CFormLabel>
            <CFormInput
              required
              type="tel"
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập Address"
              placeholder="Nhập Address"
            />
          </CCol>
          <CCol md={12}>
            <CButton color="primary" type="submit">
              Lưu thay đổi
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default CustomerEdit
