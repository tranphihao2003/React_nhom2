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
} from '@coreui/react'
// api
import API_Suppliers from '../../services/API/API_suppliers'
const SuppliersAdd = () => {
  useEffect(() => {
    document.title = 'Thêm nhà phân phối'
  }, [])
  const [status, setStatus] = useState(null)
  const API_Class = new API_Suppliers()
  const [formData, setFormData] = useState({
    Supplier_Name: '',
    Contact_Name: '',
    Contact_Email: '',
    Contact_Phone: '',
    Address: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData({
      Supplier_Name: '',
      Contact_Name: '',
      Contact_Email: '',
      Contact_Phone: '',
      Address: '',
    })
    API_Class.createProduct(formData)
      .then((response) => {
        setStatus(true)
      })
      .catch((error) => {
        setStatus(false)
      })
  }

  return (
    <CForm className="row g-3" onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">Thêm nhà phân phối</h1>
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
        <CFormLabel htmlFor="Supplier_Name">Tên nhà phân phối</CFormLabel>
        <CFormInput
          type="text"
          id="Supplier_Name"
          name="Supplier_Name"
          value={formData.Supplier_Name}
          onChange={handleChange}
          required
        />
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="Contact_Name">Tên người liên hệ</CFormLabel>
        <CFormInput
          type="text"
          id="Contact_Name"
          name="Contact_Name"
          value={formData.Contact_Name}
          onChange={handleChange}
          required
        />
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="Contact_Email">Email người liên hệ</CFormLabel>
        <CFormInput
          type="email"
          id="Contact_Email"
          name="Contact_Email"
          value={formData.Contact_Email}
          onChange={handleChange}
          required
        />
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="Contact_Phone">Số điện thoại người liên hệ</CFormLabel>
        <CFormInput
          type="tel"
          id="Contact_Phone"
          name="Contact_Phone"
          value={formData.Contact_Phone}
          onChange={handleChange}
          required
        />
      </CCol>

      <CCol md={12}>
        <CFormLabel htmlFor="Address">Địa chỉ</CFormLabel>
        <CFormTextarea
          id="Address"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          required
        />
      </CCol>

      <CCol md={12}>
        <CButton color="primary" type="submit">
          Thêm nhà phân phối
        </CButton>
      </CCol>
    </CForm>
  )
}

export default SuppliersAdd
