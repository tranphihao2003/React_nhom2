import React from 'react'
import { CTable, CButton, CFormSelect, CFormLabel, CForm, CFormInput } from '@coreui/react'

const AddGenres = () => {
  return (
    <>
      <h2>Thêm Loại</h2>
      <CForm style={{ margin: '10px' }}>
        <CFormInput
          style={{ marginBottom: '10px' }}
          id=""
          label="Loại"
          placeholder="Nhập Loại"
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

export default AddGenres
