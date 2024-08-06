import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CFormTextarea,
  CAlert,
  CCardFooter,
} from '@coreui/react'
// api
import * as API_Shipper from '../../services/API/API_Shipper'
import * as API_Store from '../../services/API/API_Store'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
const ShipperAdd = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const [status, setStatus] = React.useState(null)
  const [Store, setStore] = React.useState([])

  useEffect(() => {
    document.title = 'Thêm người giao hàng'
    getdata()
  }, [])
  async function getdata() {
    const response = await API_Store.getStore(1, 100)

    const { data: stores } = response

    setStore(response.data.stores)
    console.log(response.data.stores);
    
  }
  async function create(data) {
    const response = await API_Shipper.createShipper(data)
    if (response) {
      if (response.status === 201) {
        setStatus(true)
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  return (
    <CCard>
      <CCardHeader>Thêm người giao hàng</CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSubmit(create)}>
          <h2>Thêm người giao hàng</h2>
          {status == true ? (
            <CAlert color="success">Thêm thành công</CAlert>
          ) : status == false ? (
            <CAlert color="danger">Thêm thất bại</CAlert>
          ) : null}
          <CCol md={6}>
            <CFormInput
              type="text"
              id="name"
              name="Shipper_Name"
              label="Tên người giao:"
              onChange={handleChange}
              {...register('Shipper_Name', { required: 'vui lòng nhập tên người giao hàng' })}
              invalid={!!errors.Shipper_Name}
              feedbackInvalid={errors.Shipper_Name && errors.Shipper_Name?.message}
              placeholder="Họ và tên"
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              type="number"
              id="age"
              label="Tuổi:"
              name="Age"
              onChange={handleChange}
              placeholder="Tuổi (18-40)"
              {...register('Age', { required: 'vui lòng nhập tuổi', min: 18, max: 40 })}
              invalid={!!errors.Age}
              feedbackInvalid={errors.Age && errors.Age?.message}
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              type="text"
              name="Phone"
              id="Phone"
              label="Số điện thoại:"
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              {...register('Phone', {
                required: 'vui lòng nhập số điện thoại',
                pattern: { value: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' },
              })}
              invalid={!!errors.Phone}
              feedbackInvalid={errors.Phone && errors.Phone?.message}
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              pattern="[0-9]{12}"
              type="text"
              id="ID_Card_Number"
              placeholder="Nhập số CCCD (12 số)"
              label="Chứng minh nhân dân:"
              onChange={handleChange}
              name="ID_Card_Number"
              {...register('ID_Card_Number', {
                required: 'vui lòng nhập số CCCD',
                pattern: /^[0-9]{12}$/,
              })}
              invalid={!!errors.ID_Card_Number}
              feedbackInvalid={errors.ID_Card_Number && errors.ID_Card_Number?.message}
            />
          </CCol>

          <CCol xs={12}>
            <CFormInput
              type="text"
              id="Home_Address"
              label="Địa chỉ nhà :"
              onChange={handleChange}
              name="Home_Address"
              placeholder="(Đường, phường, quận, thành phố...)"
              {...register('Home_Address', { required: 'vui lòng nhập địa chỉ nhà' })}
              invalid={!!errors.Home_Address}
              feedbackInvalid={errors.Home_Address && errors.Home_Address?.message}
            />
          </CCol>

          <CCol xs={12}>
            <CFormSelect
              aria-label="Default select example"
              options={[
                { label: 'Chọn cửa hàng làm việc', value: '' },
                ...Store.map((item) => {
                  return { label: item.Store_Name, value: item.Store_ID }
                }),
              ]}
              id="Store_ID"
              label="Cửa hàng làm việc"
              onChange={handleChange}
              name="Store_ID"
              {...register('Store_ID', { required: 'vui lòng chọn cửa hàng làm việc' })}
              invalid={!!errors.Store_ID}
              feedbackInvalid={errors.Store_ID && errors.Store_ID?.message}
            />
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Thêm người giao hàng
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton
          onClick={() => {
            navigate('/Shippers')
          }}
          color="primary"
        >
          Trở về
        </CButton>
      </CCardFooter>
    </CCard>
  )
}

export default ShipperAdd
