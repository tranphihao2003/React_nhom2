import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea,
  CAlert,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
} from '@coreui/react'
// api
import { createsuppliers } from '../../services/API/API_suppliers'
import { Link } from 'react-router-dom'
// router

const SuppliersAdd = () => {
  const [status, setStatus] = useState(null)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = 'Thêm nhà phân phối'
  }, [count])
  function create(data) {
    console.log(data)
    createsuppliers(data)
      .then((response) => {
        if (response.status === 201) {
          setStatus(true)
        }
      })
      .catch((error) => {
        setStatus(false)
      })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <CCard>
      <CCardHeader>
        <h3>Thêm nhà phân phối</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSubmit(create)}>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Thêm nhà phân phối thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Thêm nhà phân phối thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Supplier_Name">
              <strong>Tên nhà phân phối</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Nhập tên nhà phân phối"
              autoComplete="Supplier_Name"
              name="Supplier_Name"
              onChange={handleChange}
              {...register('Supplier_Name', { required: 'Vui lòng nhập tên nhà phân phối' })}
              invalid={!!errors.Supplier_Name}
              aria-invalid={errors.Supplier_Name ? 'true' : 'false'}
              feedbackInvalid={errors.Supplier_Name?.message}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Contact_Name">
              <strong>Tên người liên hệ</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              id="Contact_Name"
              name="Contact_Name"
              onChange={handleChange}
              placeholder="Nhập tên người liên hệ"
              {...register('Contact_Name', { required: true })}
              aria-invalid={errors.Contact_Name ? 'true' : 'false'}
              invalid={!!errors.Contact_Name}
              feedbackInvalid={errors.Contact_Name?.message}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Contact_Email">
              <strong>Email người liên hệ</strong>
            </CFormLabel>
            <CFormInput
              type="email"
              id="Contact_Email"
              name="Contact_Email"
              onChange={handleChange}
              placeholder="Nhập email người liên hệ"
              {...register('Contact_Email', { required: true, pattern: /^\S+@\S+$/i })}
              aria-invalid={errors.Contact_Email ? 'true' : 'false'}
              invalid={!!errors.Contact_Email}
              feedbackInvalid={errors.Contact_Email?.message}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Contact_Phone">
              <strong>Số điện thoại người liên hệ</strong>
            </CFormLabel>
            <CFormInput
              pattern="[0-9]{10}"
              type="tel"
              id="Contact_Phone"
              name="Contact_Phone"
              onChange={handleChange}
              placeholder="Nhập số điện thoại người liên hệ"
              {...register('Contact_Phone', { required: true, pattern: /[0-9]{10}/ })}
              aria-invalid={errors.Contact_Phone ? 'true' : 'false'}
              invalid={!!errors.Contact_Phone}
              feedbackInvalid={errors.Contact_Phone?.message}

            />
          </CCol>

          <CCol md={12}>
            <CFormLabel htmlFor="Address">
              <strong>Địa chỉ</strong>
            </CFormLabel>
            <CFormTextarea
              id="Address"
              name="Address"
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              {...register('Address', { required: true })}
              aria-invalid={errors.Address ? 'true' : 'false'}
              invalid={!!errors.Address}
              feedbackInvalid={errors.Address?.message}

            />
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Thêm nhà phân phối
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <Link to="/suppliers" className="btn btn-sm btn-secondary">
          Quay lại
        </Link>
      </CCardFooter>
    </CCard>
  )
}

export default SuppliersAdd
