import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,

  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CFormTextarea,
  CAlert,
} from '@coreui/react'
// api
import * as API_Shipper from '../../services/API/API_Shipper'
import * as API_Store from '../../services/API/API_Store'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
const ShipperEdit = () => {
  const navigate = useNavigate()
  let { id } = useParams()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm()
  const [status, setStatus] = useState(null)
  const [Store, setStore] = useState([])

  useEffect(() => {
    document.title = 'Chỉnh sửa người giao hàng'
    getData()
  }, [])

  async function getData() {
    const responseStore = await API_Store.getStore(1, 100)
    const { data: Store } = responseStore
    setStore(Store.stores)

    const responseShipper = await API_Shipper.getShipperById(id)
    const { data: Shipper } = responseShipper
    reset(Shipper[0]) // reset form with fetched data
  }

  async function update(formData) {
    const response = await API_Shipper.updateShipper({ id, ...formData })
    if (response) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }

  return (
    <CCard>
      <CCardHeader>Chỉnh sửa người giao hàng</CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSubmit(update)}>
          <h2>Chỉnh sửa người giao hàng</h2>
          {status === true && <CAlert color="success">Cập nhật thành công</CAlert>}
          {status === false && <CAlert color="danger">Cập nhật thất bại</CAlert>}
          <CCol md={6}>
            <CFormInput
              type="text"
              id="name"
              name="Shipper_Name"
              label="Tên người giao:"
              {...register('Shipper_Name', { required: 'Vui lòng nhập tên người giao' })}
              invalid={!!errors.Shipper_Name}
              feedbackInvalid={errors.Shipper_Name?.message}
              placeholder="Họ và tên"
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              type="number"
              id="age"
              label="Tuổi:"
              name="Age"
              {...register('Age', { required: 'Vui lòng nhập tuổi (18-40)', min: 18, max: 40 })}
              invalid={!!errors.Age}
              feedbackInvalid={errors.Age?.message}
              placeholder="Tuổi (18-40)"
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              type="text"
              name="Phone"
              id="Phone"
              label="Số điện thoại:"
              {...register('Phone', {
                required: 'Vui lòng nhập số điện thoại',
                pattern: { value: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' },
              })}
              invalid={!!errors.Phone}
              feedbackInvalid={errors.Phone?.message}
              placeholder="Nhập số điện thoại"
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              pattern="[0-9]{12}"
              type="text"
              id="ID_Card_Number"
              placeholder="Nhập số CMND (12 số)"
              label="Chứng minh nhân dân:"
              {...register('ID_Card_Number', {
                required: 'Vui lòng nhập số CMND',
                pattern: { value: /^[0-9]{12}$/, message: 'Số CMND không hợp lệ' },
              })}
              invalid={!!errors.ID_Card_Number}
              feedbackInvalid={errors.ID_Card_Number?.message}
              name="ID_Card_Number"
            />
          </CCol>

          <CCol xs={12}>
            <CFormInput
              type="text"
              id="Home_Address"
              label="Địa chỉ nhà :"
              {...register('Home_Address', { required: 'Vui lòng nhập địa chỉ nhà' })}
              invalid={!!errors.Home_Address}
              feedbackInvalid={errors.Home_Address?.message}
              name="Home_Address"
              placeholder="(Đường, phường, quận, thành phố...)"
            />
          </CCol>

          <CCol xs={12}>
            <CFormSelect
              aria-label="Default select example"
              options={[
                { label: 'Chọn cửa hàng làm việc', value: '' },
                ...Store.map((item) => ({ label: item.Store_Name, value: item.Store_ID })),
              ]}
              id="Store_ID"
              label="Cửa hàng làm việc"
              {...register('Store_ID', { required: 'Vui lòng chọn cửa hàng làm việc' })}
              invalid={!!errors.Store_ID}
              feedbackInvalid={errors.Store_ID?.message}
              name="Store_ID"
            />
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Cập nhật người giao hàng
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton onClick={()=>{
          navigate('/Shippers')
        }} color="warning">
          Quay lại
        </CButton>
      </CCardFooter>
    </CCard>
  )
}

export default ShipperEdit
