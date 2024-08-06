import React, { useEffect, useState } from 'react'
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
import * as APIGen from '../../services/API/API_Genre'
import { useParams, useNavigate } from 'react-router-dom'

const ProductsEdit = () => {
  let { id } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)
  const [product, setProduct] = useState({
    Product_Name: '',
    Product_Artist: '',
    Genre_ID: '',
    Product_Stock: '',
    Product_Image: null,
    Product_Description: '',
    Product_Price: '',
  })
  const [Genres, setGenres] = useState([])
  useEffect(() => {
    getProduct()
  }, [])
  function update() {
    API.updateProduct(product)
      .then((response) => {
        setStatus(true)
      })
      .catch((error) => {
        setStatus(false)
      })
  }
  async function getProduct() {
    const response = await APIGen.getGenres()
    const { data: genres } = response

    setGenres(genres.genres)
    const responseProduct = await API.getProductById(id)
    const { data: product } = responseProduct

    setProduct(product[0])
  }
  const [validated, setValidated] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setProduct({
        ...product,
        [name]: files[0],
      })
    } else {
      setProduct({
        ...product,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      update()
      console.log(product)
    }
    setValidated(true)
  }

  return (
    <CCard className="p-4">
      <CForm
        className="row g-3"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2>Chỉnh sửa sản phẩm</h2>
        {status === false && <CAlert color="danger">Chỉnh sửa sản phẩm thất bại</CAlert>}
        {status === true && <CAlert color="success">Chỉnh sửa sản phẩm thành công</CAlert>}
        <CCol md={6}>
          <CFormInput
            placeholder="Tên sản phẩm"
            onChange={handleChange}
            feedbackInvalid="Tên sản phẩm không được để trống"
            type="text"
            id="inputProductName"
            label="Tên sản phẩm"
            value={product.Product_Name}
            name="Product_Name"
            required
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputProductArtist"
            label="Tên nghệ sĩ"
            placeholder="Nhập tên nghệ sĩ"
            onChange={handleChange}
            feedbackInvalid="Tên nghệ sĩ không được để trống"
            value={product.Product_Artist}
            name="Product_Artist"
            required
          />
        </CCol>
        <CCol xs={6}>
          <label htmlFor="inputProductType" className="form-label">
            {' '}
            Thể loại âm nhạc
          </label>
          <CFormSelect
            aria-label="Default select example"
            options={Genres.map((genre) => {
              return { value: genre.Genre_ID, label: genre.Genre_Name }
            })}
            name="Genre_ID"
            id="inputProductType"
            value={product.Genre_ID}
            onChange={handleChange}
            feedbackInvalid="Chọn thể loại âm nhạc"
            required
          />
        </CCol>
        <CCol xs={6}>
          <CFormInput
            type="number"
            id="inputProductPrice"
            label="Giá sản phẩm"
            placeholder="Nhập giá sản phẩm"
            value={product.Product_Price}
            name="Product_Price"
            onChange={handleChange}
            feedbackInvalid="Giá sản phẩm không được để trống"
            required
          />
        </CCol>
        <CCol xs={6}>
          <CFormInput
            type="number"
            id="inputProductQuantity"
            label="Số lượng"
            placeholder="nhập số lượng"
            value={product.Product_Stock}
            name="Product_Stock"
            onChange={handleChange}
            feedbackInvalid="Số lượng không được để trống"
            required
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="file"
            id="formFile"
            label="Chọn hình ảnh sản phẩm"
            name="Product_Image"
            onChange={handleChange}
            feedbackInvalid="Chọn hình ảnh sản phẩm"
          />
        </CCol>
        <CCol md={12}>
          <CFormTextarea
            id="exampleFormControlTextarea1"
            label="Mô tả sản phẩm"
            rows={3}
            placeholder="Nhập mô tả sản phẩm"
            name="Product_Description"
            value={product.Product_Description}
            onChange={handleChange}
            feedbackInvalid="Mô tả sản phẩm không được để trống"
            required
          ></CFormTextarea>
        </CCol>

        <CCol md={12}>
          <CButton color="primary" type="submit">
            Chỉnh sửa sản phẩm
          </CButton>
        </CCol>
        <CCol md={12}>
          <CButton
            color="danger"
            onClick={() => {
              navigate('/products')
            }}
          >
            Quay lại
          </CButton>
        </CCol>
      </CForm>
    </CCard>
  )
}

export default ProductsEdit
