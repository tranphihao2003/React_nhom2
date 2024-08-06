import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as API_Genres from '../../services/API/API_Genre'
import { CButton, CCol, CForm, CFormInput, CFormLabel, CAlert, CCard } from '@coreui/react'

const EditGenres = () => {
  const [validated, setValidated] = useState(false)
  const [status, setStatus] = useState(null)
  const [formData, setFormData] = useState({
    Genre_Name: '',
  })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Chỉnh sửa - Loại'
    getData()
  }, [])

  const getData = () => {
    API_Genres.getGenreById(id)
      .then((response) => {
        console.log(response)
        console.log('Response from getGenres:', response.data[0])
        if (response.data[0]) {
          setFormData(response.data[0])
        } else {
          console.error('Invalid response data:', response)
        }
      })
      .catch((error) => {
        console.error('Error fetching genre data:', error)
      })
  }

  const update = () => {
    console.log(formData)
    API_Genres.updateGenre({ ...formData })
      .then((response) => {
        console.log('Phản hồi từ updateGenres:', response.data)
        setStatus(true)
        setTimeout(() => {
          navigate('/genres')
        }, 2000) // Redirect after 2 seconds
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật thể loại:', error)
        setStatus(false)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      update()
    }
    setValidated(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <CForm className="row g-3" onSubmit={handleSubmit} noValidate validated={validated}>
      <h1 className="text-center mb-4">Chỉnh sửa Loại</h1>
      {status === false && (
        <CCol md={12}>
          <CAlert color="danger">Chỉnh sửa loại thất bại</CAlert>
        </CCol>
      )}
      {status === true && (
        <CCol md={12}>
          <CAlert color="success">Chỉnh sửa loại thành công</CAlert>
        </CCol>
      )}

      <CCol md={6}>
        <CFormLabel htmlFor="Genre_Name">Tên loại</CFormLabel>
        <CFormInput
          type="text"
          id="Genre_Name"
          name="Genre_Name"
          value={formData.Genre_Name}
          onChange={handleChange}
          required
        />
      </CCol>

      <CCol md={12}>
        <CButton color="primary" type="submit">
          Sửa loại
        </CButton>
        <CButton color="info" onClick={() => navigate('/genres')}>
          Quay lại
        </CButton>
      </CCol>
    </CForm>
  )
}

export default EditGenres
