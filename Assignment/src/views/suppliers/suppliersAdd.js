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
  CCardFooter,
} from '@coreui/react'
// api
import {createsuppliers} from '../../services/API/API_suppliers'
import { Link } from 'react-router-dom'
// router

const SuppliersAdd = () => {
  const [status, setStatus] = useState(null)
  const [validated, setValidated] = useState(false)
  const [count, setCount] = useState(0)
  
  const [formData, setFormData] = useState({
    Supplier_Name: '',
    Contact_Name: '',
    Contact_Email: '',
    Contact_Phone: '',
    Address: '',
  })
  useEffect(() => {
    document.title = 'Thêm nhà phân phối'
  }, [count])
  function create() {
    createsuppliers(formData)
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
        <h3>
        Thêm nhà phân phối
        </h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
         
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Thêm nhà phân phối thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Thêm nhà phân phối thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Supplier_Name">
              <strong>Tên nhà phân phối</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Nhập tên nhà phân phối"
              autoComplete="Supplier_Name"
              required
              name="Supplier_Name"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập tên nhà phân phối"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Contact_Name">
              <strong>Tên người liên hệ</strong>
            </CFormLabel>
            <CFormInput
              required
              type="text"
              id="Contact_Name"
              name="Contact_Name"
              onChange={handleChange}
              placeholder="Nhập tên người liên hệ"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Contact_Email">
              <strong>Email người liên hệ</strong>
            </CFormLabel>
            <CFormInput
              required
              type="email"
              id="Contact_Email"
              name="Contact_Email"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập email"
              placeholder="Nhập email người liên hệ"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Contact_Phone">
              <strong>Số điện thoại người liên hệ</strong>
            </CFormLabel>
            <CFormInput
              pattern="[0-9]{10}"
              required
              type="tel"
              id="Contact_Phone"
              name="Contact_Phone"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập số điện thoại"
              placeholder="Nhập số điện thoại người liên hệ"
            />
          </CCol>

          <CCol md={12}>
            <CFormLabel htmlFor="Address">
              <strong>Địa chỉ</strong>
            </CFormLabel>
            <CFormTextarea
              required
              id="Address"
              name="Address"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập địa chỉ"
              placeholder="Nhập địa chỉ"
            />
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Thêm nhà phân phối
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <Link
          to="/suppliers"
          className="btn btn-sm btn-secondary"
        >
          Quay lại
        </Link>
      </CCardFooter>
    </CCard>
  )
}

export default SuppliersAdd
