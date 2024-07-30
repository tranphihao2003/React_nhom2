import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea,
  CAlert,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
// api
import API_Genres from '../../services/API/API_Genres'

const AddGenres = () => {
  const [status, setStatus] = useState(null)
  const [validated, setValidated] = useState(false)
  const [count, setCount] = useState(0)
  const API_Class = new API_Genres()
  const [formData, setFormData] = useState({
    Genre_Name: '',
  })
  useEffect(() => {
    document.title = 'Thêm Loại'
  }, [count])
  function create() {
    API_Class.createGenres(formData)
      .then((response) => {
        setStatus(true)
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
        <h3>Thêm Loại</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Thêm loại thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Thêm loại thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Genre_Name">
              <strong>Tên Loại</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Nhập tên Loại"
              autoComplete="Genre_Name"
              required
              name="Genre_Name"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập tên loại"
            />
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Thêm Loại
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AddGenres
