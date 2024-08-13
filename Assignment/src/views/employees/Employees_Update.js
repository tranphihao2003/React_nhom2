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
import * as API from '../../services/API/API_Employees'

const Employees_Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [status2, setStatus2] = useState(null)
  const [validated, setValidated] = useState(false)
  const [stores, setStores] = useState([])
  const [formData, setFormData] = useState({
    Store_ID: '',
    Employee_ID: '',
    First_Name: '',
    Last_Name: '',
    Salary: '',
    Position: '',
    Status: 0,
  })

  useEffect(() => {
    document.title = 'Cập nhật nhân viên'
    fetchEmployeesByID()
    fetchStores()
  }, [])

  const fetchStores = async () => {
    try {
      const response = await API_Store.getStore(1, 100)
      const { data: stores } = response

      console.log(stores.stores)
      setStores(stores.stores)

    } catch (error) {
      console.error('Failed to fetch stores:', error)
    }
  }

  const fetchEmployeesByID = async () => {
    try {
      const response = await API.getEmployeesDetail(id)
      const { data: employees } = response

      setFormData({
        Store_ID: employees[0].Store_ID || '',
        Employee_ID: employees[0].Employee_ID || '',
        First_Name: employees[0].First_Name || '',
        Last_Name: employees[0].Last_Name || '',
        Salary: employees[0].Salary || '',
        Position: employees[0].Position || '',
        Status: employees[0].Status,
      })
    } catch (error) {
      console.error('Không thể lấy chi tiết sản phẩm:', error)
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
      updateEmpolyees()
    }
    setValidated(true)
  }

  const updateEmpolyees = async () => {
    API.updateEmployees({ ...formData })
      .then((response) => {
        setStatus2(true)
        setTimeout(() => {
          navigate('/Employees')
        }, 200)
      })
      .catch((error) => {
        console.error('Error updating store:', error)
        setStatus2(false)
      })
  }

  return (
    <CCard>
      <>
        <h2>Sửa Nhân Viên</h2>
        <CForm style={{ margin: '10px' }} noValidate onSubmit={handleSubmit} validated={validated}>
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
          <CFormInput
            style={{ marginBottom: '10px' }}
            id="First_Name"
            label="Họ"
            name="First_Name"
            placeholder="Nhập họ nhân viên"
            onChange={handleChange}
            value={formData.First_Name}
          />
          <CFormInput
            style={{ marginBottom: '10px' }}
            id="Last_Name"
            name="Last_Name"
            label="Tên"
            placeholder="Nhập tên nhân viên"
            onChange={handleChange}
            value={formData.Last_Name}
          />
          <CFormInput
            style={{ marginBottom: '10px' }}
            type="number"
            name="Salary"
            id="Salary"
            label="Lương"
            placeholder="Nhập số Lương"
            onChange={handleChange}
            value={formData.Salary}
          />
          <CFormSelect
            style={{ marginBottom: '10px' }}
            label="Chức vụ"
            name="Position"
            onChange={handleChange}
            value={formData.Position}
            options={[
              'Chọn chức vụ',
              { label: 'Quản lý', value: '1' },
              { label: 'Nhân viên', value: '2' },
            ]}
          />
          <CFormSelect
            aria-label="Default select example"
            id="Store_ID"
            label="Cửa hàng làm việc"
            onChange={handleChange}
            required
            name="Store_ID"
            feedbackInvalid="Vui lòng chọn cửa hàng làm việc"
            value={formData.Store_ID}
          >
            <option value="">Chọn cửa hàng làm việc</option>
            {stores.map((item, index) => (
              <option key={`${item.Store_ID}-${index}`} value={item.Store_ID}>
                {item.Store_Name}
              </option>
            ))}
          </CFormSelect>
          <CFormSelect
            style={{ marginBottom: '10px' }}
            name="Status"
            onChange={handleChange}
            value={formData.Status}
            hidden
            options={['Chọn chức vụ', { label: 'Quản lý', value: '0' }]}
          />
          <CButton color="primary" style={{ marginRight: '10px' }} type="submit">
            Sửa
          </CButton>
          <CButton color="danger">Hủy</CButton>
        </CForm>
        {console.log(stores)}

        <></>
      </>
    </CCard>
  )
}

export default Employees_Update
