import React from 'react'
import { CCard, CCardBody, CForm, CFormInput, CButton, CFormLabel } from '@coreui/react'

const Stores_Edit = () => {
  return (
    <div>
      <CCard>
        <CCardBody>
          <h2>Sửa Cửa Hàng</h2>
          <CForm>
            <CFormInput
              type="text"
              id="storeName"
              label="Tên cửa hàng"
              placeholder="Nhập tên cửa hàng"
              style={{ marginBottom: '10px' }}
            />
            <CFormInput
              type="text"
              id="storeLocation"
              label="Địa chỉ cửa hàng"
              placeholder="Nhập địa chỉ cửa hàng"
              style={{ marginBottom: '10px' }}
            />
            <CFormInput
              type="text"
              id="storePhone"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              style={{ marginBottom: '10px' }}
            />
            <CButton type="submit" color="primary" style={{ marginRight: '10px' }}>
              Lưu
            </CButton>
            <CButton type="button" color="danger">
              Hủy
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Stores_Edit
