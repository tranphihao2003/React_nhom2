import React from 'react'
import { CTable, CButton, CFormSelect, CFormLabel, CForm, CFormInput } from '@coreui/react'

const EditEmployees = () => {
  return (
    <>
      <h2>Sửa Nhân Viên</h2>
      <CForm style={{ margin: '10px' }}>
        <CFormInput
          style={{ marginBottom: '10px' }}
          id=""
          label="Tên"
          placeholder="Nhập tên nhân viên"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          id=""
          label="Họ"
          placeholder="Nhập họ nhân viên"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="number"
          id=""
          label="Lương"
          placeholder="Nhập số Lương"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Chức vụ"
          options={[
            'Chọn chức vụ',
            { label: 'Quản lý', value: '1' },
            { label: 'Nhân viên', value: '2' },
          ]}
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Cửa hàng"
          options={[
            'Chọn sản phẩm',
            { label: 'Chi nhánh 1', value: '1' },
            { label: 'Chi nhánh 2', value: '2' },
          ]}
        />
        <CButton color="primary" style={{ marginRight: '10px' }}>
          Sửa
        </CButton>
        <CButton color="danger">Hủy</CButton>
      </CForm>
      <></>
    </>
  )
}

export default EditEmployees
