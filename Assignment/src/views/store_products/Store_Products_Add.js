import React from 'react'
import { CCard, CCardBody, CForm, CFormInput, CButton } from '@coreui/react'

const Store_Products_Add = () => {
  return (
    <div>
      <CCard>
        <CCardBody>
          <h2>Thêm Sản phẩm vào Cửa hàng</h2>
          <CForm>
            <CFormInput
              type="text"
              id="storeID"
              label="Store ID"
              placeholder="Nhập Store ID"
              style={{ marginBottom: '10px' }}
            />
            <CFormInput
              type="text"
              id="productID"
              label="Product ID"
              placeholder="Nhập Product ID"
              style={{ marginBottom: '10px' }}
            />
            <CFormInput
              type="number"
              id="productStock"
              label="Product Stock"
              placeholder="Nhập số lượng sản phẩm"
              style={{ marginBottom: '10px' }}
            />
            <CButton type="submit" color="primary" style={{ marginRight: '10px' }}>
              Thêm
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

export default Store_Products_Add
