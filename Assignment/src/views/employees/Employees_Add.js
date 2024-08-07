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
  CFormSelect,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import API_Employees from '../../services/API/API_Employees'
import API_Store from '../../services/API/API_Store'
import { useForm } from 'react-hook-form'

const Employees_Add = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)
  const [validated, setValidated] = useState(false)
  const [stores, setStores] = useState([])
  const [formData, setFormData] = useState({
    Store_ID: '',
    Status: 0,
  })

  const API_Store_Class = new API_Store()
  const API_Employees_Class = new API_Employees()

  useEffect(() => {
    document.title = 'Thêm nhân viên'
    fetchStores()
  }, [])

  const fetchStores = async () => {
    try {
      const response = await API_Store_Class.getStore()
      if (response && response.stores) {
        setStores(response.stores)
      } else {
        console.error('Invalid response format for stores:', response)
      }
    } catch (error) {
      console.error('Failed to fetch stores:', error)
    }
  };


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
      createEmployees()
    }
    setValidated(true)
  }

  const createEmployees = async () => {
    try {
      const response = await API_Employees_Class.createEmpoyees(formData);
      setStatus(true)
      setTimeout(() => {
        navigate('/Employees')
      }, 700)
    } catch (error) {
      setStatus(false)
      console.error('Failed to create product:', error)
    }
  };

  return (
    <>
      <h2>Thêm Nhân Viên</h2>
      <CForm style={{ margin: '10px' }} noValidate onSubmit={handleSubmit} validated={validated}>
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
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="text"
          id="First_Name"
          name="First_Name"
          label="Họ"
          onChange={handleChange}
          placeholder="Nhập họ nhân viên"
          value={formData.First_Name}
          feedbackInvalid="Vui lòng nhập họ nhân viên!"
          required
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          id="Last_Name"
          name="Last_Name"
          label="Tên"
          onChange={handleChange}
          placeholder="Nhập tên nhân viên"
          value={formData.Last_Name}
          feedbackInvalid="Vui lòng nhập tên nhân viên!"
          required
        />
        <CFormInput
          style={{ marginBottom: '10px' }}
          type="number"
          id="Salary"
          name="Salary"
          label="Lương"
          onChange={handleChange}
          placeholder="Nhập số Lương"
          value={formData.Salary}
          feedbackInvalid="Vui lòng nhập số lương"
          required
        />
        <CFormSelect
          style={{ marginBottom: '10px' }}
          label="Chức vụ"
          name="Position"
          onChange={handleChange}
          value={formData.Position}
          feedbackInvalid="Vui lòng chọn chức vụ"
          required
          options={[
            'Chọn chức vụ',
            { label: 'Quản lý', value: '1' },
            { label: 'Nhân viên', value: '2' },
          ]}
        />
        <CFormSelect
          style={{ marginRight: '10px' }}
          id="Store_ID"
          name="Store_ID"
          onChange={handleChange}
          required
          aria-label="Chọn cửa hàng"
          feedbackInvalid="Vui lòng nhập tên cửa hàng"
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
        <CFormSelect
          style={{ marginBottom: '10px' }}
          name="Status"
          onChange={handleChange}
          hidden
          value={formData.Status}
          options={['Trạng thái', { label: 'Hiển thị', value: '0' }]}
        />
        <CButton color="primary" style={{ marginRight: '10px' }} type="submit">
          Thêm
        </CButton>
        <CButton color="danger">Hủy</CButton>
      </CForm>
      {console.log(stores)}
      <></>
    </>
  )
}

export default Employees_Add
