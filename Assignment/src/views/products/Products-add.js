import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  CAlert,
  CButton,
  CCard,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import * as API from '../../services/API/API_Product'
import * as API_genres from '../../services/API/API_Genre'
import { useNavigate } from 'react-router-dom'

const ProductsAdd = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)

  const [Genres, setGenres] = useState([])
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  function create(data) {
    data.Product_Image = data.Product_Image[0]
    console.log(data)

    API.createProduct(data)
      .then((response) => {
        if (response.status === 201) {
          setStatus(true)
        }
      })
      .catch((error) => {
        setStatus(false)
      })
  }

  useEffect(() => {
    getGenres()
  }, [])

  async function getGenres() {
    const response = await API_genres.getGenres()
    const { data: genres } = response
    setGenres(genres.genres)
  }

  return (
    <CCard className="p-4">
      <CForm
        className="row g-3"
        noValidate
        onSubmit={handleSubmit(create)}
        encType="multipart/form-data"
      >
        <h2>Thêm sản phẩm</h2>
        {status === false && <CAlert color="danger">Thêm sản phẩm thất bại</CAlert>}
        {status === true && <CAlert color="success">Thêm sản phẩm thành công</CAlert>}
        <CCol md={6}>
          <CFormInput
            placeholder="Tên sản phẩm"
            type="text"
            id="inputProductName"
            label="Tên sản phẩm"
            name="Product_Name"
            {...register('Product_Name', { required: 'Vui lòng nhập tên sản phẩm' })}
            invalid={!!errors.Product_Name}
            feedbackInvalid={errors.Product_Name && errors.Product_Name?.message}
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputProductArtist"
            label="Tên nghệ sĩ"
            placeholder="Nhập tên nghệ sĩ"
            name="Product_Artist"
            {...register('Product_Artist', { required: 'Vui lòng nhập tên nghệ sĩ' })}
            invalid={!!errors.Product_Artist}
            feedbackInvalid={errors.Product_Artist && errors.Product_Artist?.message}
          />
        </CCol>
        <CCol xs={6}>
          <label htmlFor="inputProductType" className="form-label">
            Thể loại âm nhạc
          </label>
          <CFormSelect
            aria-label="Default select example"
            options={[
              { value: '', label: 'Chọn mã loại' },
              ...Genres.map((genre) => {
                return { value: genre.Genre_ID, label: genre.Genre_Name }
              }),
            ]}
            name="Genre_ID"
            id="inputProductType"
            {...register('Genre_ID', { required: 'Vui lòng chọn thể loại' })}
            invalid={!!errors.Genre_ID}
            feedbackInvalid={errors.Genre_ID && errors.Genre_ID?.message}
          />
        </CCol>

        <CCol xs={6}>
          <CFormInput
            type="text"
            id="inputProductPrice"
            label="Giá sản phẩm"
            placeholder="Nhập giá sản phẩm"
            name="Product_Price"
            {...register('Product_Price', { required: 'Vui lòng nhập giá sản phẩm', min: 0 })}
            invalid={!!errors.Product_Price}
            feedbackInvalid={errors.Product_Price && errors.Product_Price?.message}
          />
        </CCol>
        <CCol xs={6}>
          <CFormInput
            type="text"
            id="inputProductQuantity"
            label="Số lượng"
            placeholder="nhập số lượng"
            name="Product_Stock"
            {...register('Product_Stock', { required: 'Vui lòng nhập số lượng', min: 0 })}
            invalid={!!errors.Product_Stock}
            feedbackInvalid={errors.Product_Stock && errors.Product_Stock?.message}
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="file"
            id="formFile"
            label="Chọn hình ảnh sản phẩm"
            name="Product_Image"
            {...register('Product_Image', { required: 'Vui lòng chọn hình ảnh' })}
            invalid={!!errors.Product_Image}
            feedbackInvalid={errors.Product_Image && errors.Product_Image?.message}
          />
        </CCol>
        <CCol md={12}>
          <CFormTextarea
            id="exampleFormControlTextarea1"
            label="Mô tả sản phẩm"
            rows={3}
            placeholder="Nhập mô tả sản phẩm"
            name="Product_Description"
            {...register('Product_Description', { required: 'Vui lòng nhập mô tả sản phẩm' })}
            invalid={!!errors.Product_Description}
            feedbackInvalid={errors.Product_Description && errors.Product_Description?.message}
          ></CFormTextarea>
        </CCol>

        <CCol md={12}>
          <CButton color="primary" type="submit" className="me-2">
            Thêm sản Phẩm
          </CButton>
          <CButton
            color="secondary"
            type="button"
            onClick={() => {
              navigate('/products')
            }}
          >
            Quay lại danh sách
          </CButton>
        </CCol>
      </CForm>
    </CCard>
  )
}

export default ProductsAdd
