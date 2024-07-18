import React from 'react'
import { CTable, CButton, CFormSelect, CFormLabel, CForm, CFormInput } from '@coreui/react'

const AddCustomers = () => {
  return (
    <>
      <h2>Thêm Khách hàng</h2>
      <CForm style={{ margin: '10px' }}>
        <CFormInput
          style={{ marginBottom: '10px' }}
          id=""
          label="Tên"
          placeholder="Nhập tên người dùng"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          id=""
          label="Họ"
          placeholder="Nhập họ người dùng"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="email"
          id=""
          label="Email"
          placeholder="Nhập Email người dùng"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="number"
          id=""
          label="Số điện thoại"
          placeholder="Nhập Số điện thoại người dùng"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="text"
          id=""
          label="Địa chỉ"
          placeholder="Nhập Địa chỉ người dùng"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CButton color="primary" style={{ marginRight: '10px' }}>
          Thêm
        </CButton>
        <CButton color="danger">Hủy</CButton>
      </CForm>
      <></>
    </>
  )
}

export default AddCustomers
