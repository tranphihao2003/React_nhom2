import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CAlert,
  CCard,
  CCardHeader,
  CCardBody,
  CFormSelect,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import API_Order from '../../services/API/API_Order'

const Order_Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    Status: '',
  })

  const API_Order_Class = new API_Order()

  return (
    <>
      <h2>Cập nhật đơn hàng</h2>
      <CForm style={{ margin: '10px' }}>
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Mã khách hàng"
          options={[
            'Chọn khách hàng',
            { label: 'Phi Hào', value: '1' },
            { label: 'Quốc Kiệt', value: '2' },
          ]}
          disabled
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Sản phẩm"
          options={[
            'Chọn sản phẩm',
            { label: 'Đánh Đổi', value: '1' },
            { label: 'Loi Choi', value: '2' },
          ]}
          disabled
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="number"
          id=""
          label="Số lượng"
          placeholder="Nhập số lượng"
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
          disabled
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="date"
          id=""
          label="Ngày đặt hàng"
          placeholder=""
          text=""
          aria-describedby="exampleFormControlInputHelpInline"
          disabled
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Nhân viên nhập đơn"
          options={[
            'Chọn nhân viên',
            { label: 'Thái Dương', value: '1' },
            { label: 'Kỳ Nam', value: '2' },
          ]}
          disabled
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Cửa hàng"
          options={[
            'Chọn cửa hàng',
            { label: 'Chi nhánh 1', value: '1' },
            { label: 'Chi nhánh 2', value: '2' },
          ]}
          disabled
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Phương thức thanh toán"
          options={[
            'Chọn phương thức thanh toán',
            { label: 'Thanh toán khi nhận hàng', value: '1' },
            { label: 'Tài khoản ngân hàng', value: '2' },
          ]}
          disabled
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
          Cập nhật
        </CButton>
        <CButton color="danger">Hủy</CButton>
      </CForm>
      <></>
    </>
  )
}

export default Order_Update
