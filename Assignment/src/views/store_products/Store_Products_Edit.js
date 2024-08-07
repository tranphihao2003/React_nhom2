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
import * as API_Store from '../../services/API/API_Store'
import * as API_Products from '../../services/API/API_Product'
import * as API_Store_Products from '../../services/API/API_Store_Products'
const Store_Products_Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [status2, setStatus2] = useState(null)
  const [validated, setValidated] = useState(false)
  const [stores, setStores] = useState([])
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    Store_ID: '',
    Product_ID: '',
    Product_Stock: '',
    status: '',
  })

  useEffect(() => {
    document.title = 'Chỉnh sửa sản phẩm'
    fetchStores()
    fetchProductDetails()
    fetchProducts()
  }, [id])

  const fetchStores = async () => {
    try {
      const response = await API_Store.getStore()
      const { data: stores } = response

      if (stores && stores.stores) {
        setStores(stores.stores)
      } else {
        console.error('Invalid response format for stores:', response)
      }
    } catch (error) {
      console.error('Failed to fetch stores:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await API_Products.getProducts(1, 100)
      const { data: products } = response
      if (products && products.products) {
        setProducts(products.products)
      } else {
        console.error('Invalid response format for products:', response)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const fetchProductDetails = async () => {
    try {
      const response = await API_Store_Products.getStoreById(id)
      const { data: store_product } = response
      console.log(store_product)

      if (store_product && store_product.length > 0) {
        setFormData({
          store_products_ID: store_product[0].store_products_ID,
          Store_ID: store_product[0].Store_ID || '',
          Product_ID: store_product[0].Product_ID || '',
          Product_Stock: store_product[0].Product_Stock || '',
          status: store_product[0].status,
        })
      } else {
        console.error('Invalid response format for product details:', response)
      }
    } catch (error) {
      console.error('Failed to fetch product details:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      updateProduct()
    }
    setValidated(true)
  }

  const updateProduct = async () => {
    try {
      const response = await API_Store_Products.updateStore(formData) // Ensure this method is correct
      if (response) {
        setStatus2(true)
        navigate('/Store_Products')
      } else {
        setStatus2(false)
      }
    } catch (error) {
      setStatus2(false)
      console.error('Failed to update product:', error)
    }
  }

  return (
    <CCard>
      <CCardHeader>
        <h3>Chỉnh sửa sản phẩm</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
          {status2 === false && (
            <CCol md={12}>
              <CAlert color="danger">Chỉnh sửa sản phẩm thất bại</CAlert>
            </CCol>
          )}
          {status2 === true && (
            <CCol md={12}>
              <CAlert color="success">Chỉnh sửa sản phẩm thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Store_ID">
              <strong>Cửa hàng</strong>
            </CFormLabel>
            <CFormSelect
              aria-label="Chọn cửa hàng"
              id="Store_ID"
              name="Store_ID"
              onChange={handleChange}
              required
              value={formData.Store_ID}
            >
              <option value="">Chọn cửa hàng</option>
              {stores.map((item, index) => (
                <option key={`${item.Store_ID}-${index}`} value={item.Store_ID}>
                  {item.Store_Name}
                </option>
              ))}
            </CFormSelect>
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Product_ID">
              <strong>Sản phẩm</strong>
            </CFormLabel>
            <CFormSelect
              id="Product_ID"
              name="Product_ID"
              onChange={handleChange}
              required
              aria-label="Chọn sản phẩm"
              value={formData.Product_ID}
            >
              <option value="">Chọn sản phẩm</option>
              {products.map((product, index) => (
                <option key={`${product.Product_ID}-${index}`} value={product.Product_ID}>
                  {product.Product_Name}
                </option>
              ))}
            </CFormSelect>
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Product_Stock">
              <strong>Số lượng</strong>
            </CFormLabel>
            <CFormInput
              type="number"
              id="Product_Stock"
              name="Product_Stock"
              onChange={handleChange}
              required
              value={formData.Product_Stock}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="status">
              <strong>Trạng thái</strong>
            </CFormLabel>
            <CFormSelect
              id="status"
              name="status"
              onChange={handleChange}
              required
              value={formData.status}
            >
              <option value="">Chọn trạng thái</option>
              <option value="0">Có sẵn</option>
              <option value="1">Hết hàng</option>
            </CFormSelect>
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Cập nhật sản phẩm
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Store_Products_Edit
