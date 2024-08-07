import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CAlert } from '@coreui/react'
import * as API_Genre from '../../services/API/API_Genre'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AddGenres = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)
  const [Store, setStore] = useState([])

  useEffect(() => {
    document.title = 'Thêm Loại'
    getdata()
  }, [])

  useEffect(() => {
    if (status === true) {
      setTimeout(() => {
        navigate('/genres')
      }, 2000) // Redirect after 2 seconds
    }
  }, [status, navigate])

  async function getdata() {
    const response = await API_Genre.getGenres(1, 100)
    const { data: stores } = response
    setStore(response.data.stores)
  }

  async function create(data) {
    const response = await API_Genre.createGenre(data)
    if (response) {
      if (response.status === 201) {
        setStatus(true)
      } else {
        setStatus(false)
      }
    }
  }

  return (
    <CCard>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSubmit(create)}>
          <h2>Thêm loại</h2>
          {status === false ? (
            <CAlert color="success">Thêm thành công</CAlert>
          ) : status === true ? (
            <CAlert color="danger">Thêm thất bại</CAlert>
          ) : null}
          <CCol md={6}>
            <CFormInput
              type="text"
              id="name"
              name="Genre_Name"
              label="Tên loại"
              {...register('Genre_Name', { required: 'Vui lòng nhập tên loại' })}
              invalid={!!errors.Genre_Name}
              feedbackInvalid={errors.Genre_Name && errors.Genre_Name?.message}
              placeholder="Tên loại"
            />
          </CCol>
          <CCol md={12} className="">
            <CButton color="success" type="submit">
              Thêm Loại
            </CButton>
            <CButton
              onClick={() => {
                navigate('/genres')
              }}
              color="info"
            >
              Trở về
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AddGenres
