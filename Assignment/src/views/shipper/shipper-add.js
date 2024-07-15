import React from 'react'
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
} from '@coreui/react'

const ShipperAdd = () => {
  return (
    <CForm className="row g-3">
      <h1 className="text-center">Thêm người giao hàng</h1>
      
      <CCol md={6}>
        <CFormInput type="text" id="name" label="Tên người giao" />
      </CCol>
      
      <CCol md={6}>
        <CFormInput type="number" id="age" label="Tuổi" />
      </CCol>
      
      <CCol md={6}>
        <CFormInput type="text" id="phoneNumber" label="Số điện thoại" />
      </CCol>
      
      <CCol md={6}>
        <CFormInput type="text" id="idCardNumber" label="CMND" />
      </CCol>
      
      <CCol xs={12}>
        <CFormInput type="text" id="homeAddress" label="Địa chỉ nhà" />
      </CCol>
      
      <CCol xs={12}>
        <CFormSelect
          aria-label="Default select example"
          options={[
            'Chọn cửa hàng làm việc',
            { label: 'Cửa hàng 1', value: '1' },
            { label: 'Cửa hàng 2', value: '2' },
            { label: 'Cửa hàng 3', value: '3' },
          ]}
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
