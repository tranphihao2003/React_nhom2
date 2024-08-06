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
import { useNavigate } from 'react-router-dom';
import API_Accounts from '../../services/API/API_Accounts';
import API_Employees from '../../services/API/API_Employees';

const Accounts_Add = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [validated, setValidated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const API_Class = new API_Accounts();
  const employeeAPI = new API_Employees();
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Employee_ID: ''
  });

  useEffect(() => {
    document.title = 'Thêm tài khoản';

    // Lấy danh sách nhân viên
    const fetchEmployees = async () => {
      try {
        const response = await employeeAPI.getEmployees();
     
    
        // Kiểm tra và trích xuất danh sách nhân viên từ trường 'employees'
        if (response && Array.isArray(response.employees)) {
          setEmployees(response.employees);
        } else {
          console.error('Invalid response format for employees:', response);
        }
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };
    
    

    fetchEmployees();
  }, [employeeAPI]);

  const createAccount = async () => {
    try {
      await API_Class.createAccount(formData);
      setStatus(true);
      setTimeout(() => {
        navigate('/accounts');
      }, 700);
    } catch (error) {
      setStatus(false);
      console.error('Failed to create account:', error);
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
      createAccount();
    }
    setValidated(true);
  };

  return (
    <CCard>
      <CCardHeader>
        <h3>Thêm tài khoản</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Thêm tài khoản thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Thêm tài khoản thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Username">
              <strong>Tên người dùng</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              id="Username"
              name="Username"
              placeholder="Nhập tên người dùng"
              required
              onChange={handleChange}
              value={formData.Username}
              feedbackInvalid="Vui lòng nhập tên người dùng"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Password">
              <strong>Mật khẩu</strong>
            </CFormLabel>
            <CFormInput
              type="password"
              id="Password"
              name="Password"
              placeholder="Nhập mật khẩu"
              required
              onChange={handleChange}
              value={formData.Password}
              feedbackInvalid="Vui lòng nhập mật khẩu"
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="Employee_ID">
              <strong>Mã nhân viên</strong>
            </CFormLabel>
            <CFormSelect
              id="Employee_ID"
              name="Employee_ID"
              value={formData.Employee_ID}
              onChange={handleChange}
              required
              feedbackInvalid="Vui lòng chọn mã nhân viên"
            >
              <option value="">Chọn mã nhân viên</option>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <option key={employee.Employee_ID} value={employee.Employee_ID}>
                    {employee.Employee_ID}
                  </option>
                ))
              ) : (
                <option value="">Không có mã nhân viên</option>
              )}
            </CFormSelect>
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Thêm tài khoản
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default Accounts_Add;
