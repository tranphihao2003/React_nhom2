import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CAlert,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
} from '@coreui/react'
import * as API from '../../services/API/API_suppliers'

const SupplierEdit = () => {
  const [status, setStatus] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    document.title = 'Chỉnh sửa - Nhà phân phối'
    getData()
  }, [id])

  const getData = async () => {
    try {
      const response = await API.getsuppliersbyid(id)
      const { data: supplierdb } = response

      const supplier = supplierdb[0]
      for (const key in supplier) {
        setValue(key, supplier[key])
      }
    } catch (error) {
      console.error('Failed to fetch supplier data:', error)
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await API.updatesuppliers(data)
      setStatus(response.status === 200 ? true : false)
    } catch (error) {
      setStatus(false)
    }
  }

  return (
    <CCard>
      <CCardHeader>
        <h5>Chỉnh sửa nhà phân phối</h5>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="text-center mb-4">Chỉnh sửa nhà phân phối</h1>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Chỉnh sửa nhà phân phối thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Chỉnh sửa nhà phân phối thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Supplier_Name">Tên nhà phân phối</CFormLabel>
            <CFormInput
              type="text"
              id="Supplier_Name"
              {...register('Supplier_Name', { required: 'Vui lòng nhập tên nhà phân phối' })}
              aria-invalid={errors.Supplier_Name ? 'true' : 'false'}
              invalid={!!errors.Supplier_Name}
              feedback={errors.Supplier_Name?.message}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Contact_Name">Tên người liên hệ</CFormLabel>
            <CFormInput
              type="text"
              id="Contact_Name"
              {...register('Contact_Name', { required: 'Vui lòng nhập tên người liên hệ' })}
              aria-invalid={errors.Contact_Name ? 'true' : 'false'}
              invalid={!!errors.Contact_Name}
              feedback={errors.Contact_Name?.message}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Contact_Email">Email người liên hệ</CFormLabel>
            <CFormInput
              type="email"
              id="Contact_Email"
              {...register('Contact_Email', {
                required: 'Vui lòng nhập email người liên hệ',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email không hợp lệ',
                },
              })}
              aria-invalid={errors.Contact_Email ? 'true' : 'false'}
              invalid={!!errors.Contact_Email}
              feedback={errors.Contact_Email?.message}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Contact_Phone">Số điện thoại người liên hệ</CFormLabel>
            <CFormInput
              type="tel"
              id="Contact_Phone"
              {...register('Contact_Phone', {
                required: 'Vui lòng nhập số điện thoại người liên hệ',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Số điện thoại phải có 10 chữ số',
                },
              })}
              aria-invalid={errors.Contact_Phone ? 'true' : 'false'}
              invalid={!!errors.Contact_Phone}
              feedback={errors.Contact_Phone?.message}
            />
          </CCol>

          <CCol md={12}>
            <CFormLabel htmlFor="Address">Địa chỉ</CFormLabel>
            <CFormTextarea
              id="Address"
              {...register('Address', { required: 'Vui lòng nhập địa chỉ' })}
              aria-invalid={errors.Address ? 'true' : 'false'}
              invalid={!!errors.Address}
              feedback={errors.Address?.message}
            />
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Chỉnh sửa nhà phân phối
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton
          color="warning"
          onClick={() => {
            navigate('/suppliers')
          }}
        >
          Quay lại
        </CButton>
      </CCardFooter>
    </CCard>
  )
}

export default SupplierEdit
