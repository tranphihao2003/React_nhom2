import React from 'react'
import { CButton, CForm, CFormInput, CCard, CCardBody, CCardHeader } from '@coreui/react'

const Accounts_Edit = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>Sửa tài khoản</h2>
      </CCardHeader>
      <CCardBody>
        <CForm style={{ margin: '10px' }}>
          <CFormInput
            style={{ marginBottom: '10px' }}
            type="text"
            label="Username"
            placeholder="Nhập tên người dùng"
          />
          <CFormInput
            style={{ marginBottom: '10px' }}
            type="password"
            label="Password"
            placeholder="Nhập mật khẩu"
          />
          <CFormInput
            style={{ marginBottom: '10px' }}
            type="number"
            label="Employee ID"
            placeholder="Nhập mã nhân viên"
          />
          <CButton color="primary" style={{ marginRight: '10px' }}>
            Sửa
          </CButton>
          <CButton color="danger">Hủy</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Accounts_Edit
