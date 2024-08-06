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
import * as API_Store from '../../services/API/API_Store'
import { useNavigate, useParams } from 'react-router-dom'

const Stores_Edit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [status, setStatus] = useState(null)
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    Store_Name: '',
    Store_Location: '',
    Store_Phone: '',
  })

  useEffect(() => {
    document.title = 'Sửa cửa hàng'

    if (id) {
      API_Store.getStoreById(id)
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
      updateStore()
    }
    setValidated(true)
  }

  const updateStore = () => {
    API_Store.updateStore({ ...formData, Store_ID: id })
      .then((response) => {
        setStatus(true)
        setTimeout(() => {
          navigate('/Stores')
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
        <h3>Sửa cửa hàng</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Sửa cửa hàng thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Sửa cửa hàng thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Store_Name">
              <strong>Tên cửa hàng</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Nhập tên cửa hàng"
              autoComplete="Store_Name"
              required
              name="Store_Name"
              value={formData.Store_Name}
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập tên cửa hàng"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Store_Location">
              <strong>Địa chỉ</strong>
            </CFormLabel>
            <CFormInput
              required
              type="text"
              id="Store_Location"
              name="Store_Location"
              value={formData.Store_Location}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Store_Phone">
              <strong>Số điện thoại</strong>
            </CFormLabel>
            <CFormInput
              pattern="[0-9]{10}"
              required
              type="tel"
              id="Store_Phone"
              name="Store_Phone"
              value={formData.Store_Phone}
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập số điện thoại"
              placeholder="Nhập số điện thoại"
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

export default Stores_Edit
