import React from 'react'
import { CCard, CCardBody, CButton, CForm, CFormInput, CFormLabel } from '@coreui/react'

const Stores_Add = () => {
  return (
    <div>
      <CCard>
        <CCardBody>
          <h2>Thêm cửa hàng</h2>
          <CForm style={{ margin: '10px' }}>
            <CFormLabel htmlFor="storeName">Tên cửa hàng</CFormLabel>
            <CFormInput
              style={{ marginBottom: '10px' }}
              type="text"
              id="storeName"
              placeholder="Nhập tên cửa hàng"
            />

            <CFormLabel htmlFor="storeLocation">Địa chỉ</CFormLabel>
            <CFormInput
              style={{ marginBottom: '10px' }}
              type="text"
              id="storeLocation"
              placeholder="Nhập địa chỉ cửa hàng"
            />

            <CFormLabel htmlFor="storePhone">Số điện thoại</CFormLabel>
            <CFormInput
              style={{ marginBottom: '10px' }}
              type="text"
              id="storePhone"
              placeholder="Nhập số điện thoại"
            />

            <CButton color="primary" style={{ marginRight: '10px' }}>
              Thêm
            </CButton>
            <CButton color="danger">Hủy</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Stores_Add
