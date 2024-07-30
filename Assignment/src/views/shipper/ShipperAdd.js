import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CFormTextarea,
  CAlert,
} from '@coreui/react'
// api
import * as API_Shipper from '../../services/API/API_Shipper'
import * as API_Store from '../../services/API/API_Store'
const ShipperAdd = () => {
  const [validated, setValidated] = React.useState(false)
  const [status, setStatus] = React.useState(null)
  const [Store, setStore] = React.useState([])
  const [formData, setFormData] = React.useState({
    Shipper_Name: '',
    Age: '',
    Phone: '',
    ID_Card_Number: '',
    Home_Address: '',
    Store_ID: '',
  })
  useEffect(() => {
    document.title = 'Thêm người giao hàng'
    getdata()
  }, [])
  async function getdata() {

    const response = await API_Store.getStore(1, 100)
    setStore(response.stores)
  }
  async function create() {
   
    const response = await API_Shipper.createShipper(formData)
    if (response) {
      setStatus(true)
    }
  }
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      create()
    }
    setValidated(true)
  }
  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  return (
    <CForm className="row g-3" onSubmit={handleSubmit} noValidate validated={validated}>
      <h2>Thêm người giao hàng</h2>
      {status == true ? (
        <CAlert color="success">Thêm thành công</CAlert>
      ) : status == false ? (
        <CAlert color="danger">Thêm thất bại</CAlert>
      ) : null}
      <CCol md={6}>
        <CFormInput
          type="text"
          id="name"
          name="Shipper_Name"
          label="Tên người giao:"
          onChange={handleChange}
          required
          value={formData.Shipper_Name}
          feedbackInvalid="Vui lòng nhập tên người giao"
          placeholder="Họ và tên"
        />
      </CCol>

      <CCol md={6}>
        <CFormInput
          type="number"
          id="age"
          label="Tuổi:"
          name="Age"
          onChange={handleChange}
          required
          value={formData.Age}
          placeholder="Tuổi (18-40)"
          feedbackInvalid="Vui lòng nhập tuổi (18-40)"
          min={18}
          max={40}
        />
      </CCol>

      <CCol md={6}>
        <CFormInput
          pattern="[0-9]{10}"
          type="text"
          name="Phone"
          id="Phone"
          label="Số điện thoại:"
          onChange={handleChange}
          required
          value={formData.Phone}
          feedbackInvalid="Vui lòng nhập số điện thoại"
          placeholder="Nhập số điện thoại"
        />
      </CCol>

      <CCol md={6}>
        <CFormInput
          pattern="[0-9]{12}"
          type="text"
          id="ID_Card_Number"
          placeholder="Nhập số CMND (12 số)"
          label="Chứng minh nhân dân:"
          onChange={handleChange}
          required
          value={formData.ID_Card_Number}
          name="ID_Card_Number"
          feedbackInvalid="Vui lòng nhập số CMND"
        />
      </CCol>

      <CCol xs={12}>
        <CFormInput
          type="text"
          id="Home_Address"
          label="Địa chỉ nhà :"
          onChange={handleChange}
          required
          value={formData.Home_Address}
          name="Home_Address"
          feedbackInvalid="Vui lòng nhập địa chỉ nhà"
          placeholder="(Đường, phường, quận, thành phố...)"
        />
      </CCol>

      <CCol xs={12}>
        <CFormSelect
          aria-label="Default select example"
          options={[
            { label: 'Chọn cửa hàng làm việc', value: '' },
            ...Store.map((item) => {
              return { label: item.Store_Name, value: item.Store_ID }
            }),
          ]}
          id="Store_ID"
          label="Cửa hàng làm việc"
          onChange={handleChange}
          required
          // value={formData.Store_ID}
          name="Store_ID"
          feedbackInvalid="Vui lòng chọn cửa hàng làm việc"
        />
      </CCol>

      <CCol md={12}>
        <CButton color="primary" type="submit">
          Thêm người giao hàng
        </CButton>
      </CCol>
    </CForm>
  )
}

export default ShipperAdd
