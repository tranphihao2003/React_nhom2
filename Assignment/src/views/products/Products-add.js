import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormTextarea,
} from '@coreui/react'
const ProductsAdd = () => {
  return (
    <CForm className="row g-3">
      <h1 className="text-center">Thêm sản phẩm</h1>
      <CCol md={6}>
        <CFormInput type="text" id="inputEmail4" label="Tên sản phẩm" />
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" id="inputPassword4" label="Tên nghệ sĩ" />
      </CCol>
      <CCol xs={12}>
        <CFormSelect
          aria-label="Default select example"
          options={[
            'Chọn thể loại âm nhạc',
            { label: 'One', value: '1' },
            { label: 'Two', value: '2' },
            { label: 'Three', value: '3', disabled: true },
          ]}
        />
      </CCol>
      <CCol xs={6}>
        <CFormInput type="number" id="inputAddress2" label="Sô lượng" placeholder="nhập số lượng" />
      </CCol>
      <CCol md={6}>
        <CFormInput type="file" id="formFile" label="Chọn hình ảnh sản phẩm" />
      </CCol>
      <CCol md={12}>
        <CFormTextarea
          id="exampleFormControlTextarea1"
          label="Mô tả sản phẩm"
          rows={3}
          text="Nhập mô tả sản phẩm"
        ></CFormTextarea>
      </CCol>

      <CCol md={12}>
        <CButton color="primary" type="submit">
          Thêm sản Phẩm
        </CButton>
      </CCol>
    </CForm>
  )
}
export default ProductsAdd
