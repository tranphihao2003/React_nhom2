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
} from '@coreui/react';
// api
import * as API_Store from '../../services/API/API_Store';
// router
import { useNavigate } from 'react-router-dom';

const Store_Add = () => {
  const navigate = useNavigate(); // Sử dụng đúng tên hàm navigate
  const [status, setStatus] = useState(null);
  const [validated, setValidated] = useState(false);
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({
    Store_Name: '',
    Store_Location: '',
    Store_Phone: '',
  });

  useEffect(() => {
    document.title = 'Thêm cửa hàng';
  }, [count]);

  function create() {
    API_Store.createStore(formData)
      .then((response) => {
        setStatus(true);
        setTimeout(() => {
          navigate('/Stores'); 
        }, 700);
      })
      .catch((error) => {
        setStatus(false);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      create();
    }
    setValidated(true);
    setCount(count + 1);
  };

  return (
    <CCard>
      <CCardHeader>
        <h3>Thêm cửa hàng</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Thêm cửa hàng thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Thêm cửa hàng thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Store_Name">
              <strong>Tên cửa hàng</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Nhập tên cửa hàng"
              autoComplete="Store_Name"
              required
              name="Store_Name"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập tên cửa hàng"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Store_Location">
              <strong>Địa chỉ</strong>
            </CFormLabel>
            <CFormInput
              required
              type="text"
              id="Store_Location"
              name="Store_Location"
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Store_Phone">
              <strong>Số điện thoại</strong>
            </CFormLabel>
            <CFormInput
              pattern="[0-9]{10}"
              required
              type="tel"
              id="Store_Phone"
              name="Store_Phone"
              onChange={handleChange}
              feedbackInvalid="Vui lòng nhập số điện thoại"
              placeholder="Nhập số điện thoại"
            />
          </CCol>
          <CCol md={12}>
            <CButton color="primary" type="submit">
              Thêm cửa hàng
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default Store_Add;
