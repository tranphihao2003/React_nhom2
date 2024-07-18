import React from 'react'
import { CTable, CButton, CFormSelect, CFormLabel, CForm, CFormInput } from '@coreui/react'

const Order_Add = () => {
  return (
    <>
      <h2>Thêm đơn hàng</h2>
      <CForm style={{ margin: '10px' }}>
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Mã khách hàng"
          options={[
            'Chọn khách hàng',
            { label: 'Phi Hào', value: '1' },
            { label: 'Quốc Kiệt', value: '2' },
          ]}
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Sản phẩm"
          options={[
            'Chọn sản phẩm',
            { label: 'Đánh Đổi', value: '1' },
            { label: 'Loi Choi', value: '2' },
          ]}
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="number"
          id=""
          label="Số lượng"
          placeholder="Nhập số lượng"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="date"
          id=""
          label="Ngày đặt hàng"
          placeholder=""
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Nhân viên nhập đơn"
          options={[
            'Chọn nhân viên',
            { label: 'Thái Dương', value: '1' },
            { label: 'Kỳ Nam', value: '2' },
          ]}
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Cửa hàng"
          options={[
            'Chọn cửa hàng',
            { label: 'Chi nhánh 1', value: '1' },
            { label: 'Chi nhánh 2', value: '2' },
          ]}
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Phương thức thanh toán"
          options={[
            'Chọn phương thức thanh toán',
            { label: 'Thanh toán khi nhận hàng', value: '1' },
            { label: 'Tài khoản ngân hàng', value: '2' },
          ]}
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Trạng thái đơn hàng"
          options={[
            'Chọn trạng thái đơn hàng',
            { label: 'Chưa xác nhận', value: '1' },
            { label: 'Đã thanh toán', value: '2' },
            { label: 'Đã hủy', value: '3' },
          ]}
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

export default Order_Add
