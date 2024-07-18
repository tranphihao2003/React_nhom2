import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea,
} from '@coreui/react'

const SuppliersAdd = () => {
  const [formData, setFormData] = useState({
    Supplier_ID: '',
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
    // Here you can perform actions with the formData, e.g., submit to backend or process locally
    console.log(formData)
    // Reset the form after submission if needed
    setFormData({
      Supplier_ID: '',
      Supplier_Name: '',
      Contact_Name: '',
      Contact_Email: '',
      Contact_Phone: '',
      Address: '',
    })
  }

  return (
    <CForm className="row g-3" onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">Thêm nhà phân phối</h1>



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
