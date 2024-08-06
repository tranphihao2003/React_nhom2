import React, { useEffect, useState } from 'react';
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
  CFormSelect
} from '@coreui/react';
import API_Store from '../../services/API/API_Store';
import API_Store_Products from '../../services/API/API_Store_Products';
import { useNavigate } from 'react-router-dom';

const Store_Products_Add = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [validated, setValidated] = useState(false);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    Store_ID: '',
    Product_ID: '',
    Product_Stock: '',
    status: ''
  });

  const API_Store_Class = new API_Store();
  const API_Store_Products_Class = new API_Store_Products();

  useEffect(() => {
    document.title = 'Thêm sản phẩm vào cửa hàng';
    fetchStores();
    fetchProducts();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await API_Store_Class.getStore();
      if (response && response.stores) {
        setStores(response.stores);
      } else {
        console.error('Invalid response format for stores:', response);
      }
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await API_Store_Products_Class.getStore_Products();
      if (response && response.store_products) {
        setProducts(response.store_products);
      } else {
        console.error('Invalid response format for products:', response);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      createProduct();
    }
    setValidated(true);
  };

  const createProduct = async () => {
    try {
      const response = await API_Store_Products_Class.createStore(formData);
      setStatus(true);
      setTimeout(() => {
        navigate('/Store_Products');
      }, 700);
    } catch (error) {
      setStatus(false);
      console.error('Failed to create product:', error);
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h3>Thêm sản phẩm vào cửa hàng</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Thêm sản phẩm thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Thêm sản phẩm thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Store_ID">
              <strong>Cửa hàng</strong>
            </CFormLabel>
            <CFormSelect
              id="Store_ID"
              name="Store_ID"
              onChange={handleChange}
              required
              aria-label="Chọn cửa hàng"
              value={formData.Store_ID}
            >
              <option value="">Chọn cửa hàng</option>
              {stores.length > 0 ? (
                stores.map((store, index) => (
                  <option key={`${store.Store_ID}-${index}`} value={store.Store_ID}>
                    {store.Store_Name}
                  </option>
                ))
              ) : (
                <option value="">Không có cửa hàng</option>
              )}
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
              {products.length > 0 ? (
                products.map((product, index) => (
                  <option key={`${product.Product_ID}-${index}`} value={product.Product_ID}>
                    {product.Product_ID}
                  </option>
                ))
              ) : (
                <option value="">Không có sản phẩm</option>
              )}
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
              placeholder="Nhập số lượng"
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
              aria-label="Chọn trạng thái"
              value={formData.status}
            >
              <option value="">Chọn trạng thái</option>
              <option value="available">Có sẵn</option>
              <option value="out_of_stock">Hết hàng</option>
            </CFormSelect>
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Thêm sản phẩm
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default Store_Products_Add;
