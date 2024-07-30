import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import {getsuppliersbyid,updatesuppliers} from '../../services/API/API_suppliers'
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
const SupplierEdit = () => {
  
  const [validated, setValidated] = useState(false)
  const [status, setStatus] = useState(null)
  const [formData, setformData] = useState({
    Supplier_Name: '',
    Contact_Name: '',
    Contact_Email: '',
    Contact_Phone: '',
    Address: '',
  })
  let { id } = useParams()
  useEffect(() => {
    document.title = 'Chỉnh sửa -Nhà phân phối'
    getdata()
  }, [])
  function getdata() {
    getsuppliersbyid(id).then((response) => {
      console.log(response);
      setformData(response[0])
    })
  }
  function update() {
    updatesuppliers(formData)
      .then((response) => {
        setStatus(true)
      })
      .catch((error) => {
        setStatus(false)
      })
  }
  function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }else{
      update()
    }
    setValidated(true)
  }
  function handleChange(e) {
    const { name, value } = e.target
    setformData({
      ...formData,
      [name]: value,
    })
  }
  return (
    <CForm className="row g-3" onSubmit={handleSubmit} noValidate validated={validated}>
      <h1 className="text-center mb-4">Chỉnh sửa nhà phân phối</h1>
      {status === false && (
        <CCol md={12}>
          <CAlert color="danger">Chỉnh sửa nhà phân phối thất bại</CAlert>
        </CCol>
      )}
      {status === true && (
        <CCol md={12}>
          <CAlert color="success">Chỉnh sửa nhà phân phối thành công</CAlert>
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
          Chỉnh sửa nhà phân phối
        </CButton>
      </CCol>
    </CForm>
  )
}
export default SupplierEdit
