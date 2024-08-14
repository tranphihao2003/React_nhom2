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
import { useNavigate, useParams } from 'react-router-dom';
import API_Accounts from '../../services/API/API_Accounts';
import API_Employees from '../../services/API/API_Employees';

const Accounts_Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [validated, setValidated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    Username: '',
    Employee_ID: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);

  const API_Accounts_Class = new API_Accounts();
  const employeeAPI = new API_Employees();

  useEffect(() => {
    document.title = 'Chỉnh sửa tài khoản';
    const fetchData = async () => {
      await fetchAccountDetails();
      await fetchEmployees();
      setLoading(false); // Set loading to false once data is fetched
    };
    fetchData();
  }, [id]);

  const fetchAccountDetails = async () => {
    try {
      console.log('Fetching account details for ID:', id);
      const response = await API_Accounts_Class.getAccountById(id);
      console.log('API response for account details:', response);
  
      // Check if the response is an array and has at least one item
      if (Array.isArray(response) && response.length > 0) {
        const account = response[0]; // Access the first item in the array
        setFormData({
          Username: account.Username || '',
          Employee_ID: account.Employee_ID || '',
          status: account.status || ''
        });
      } else {
        console.error('Invalid response format for account details:', response);
      }
    } catch (error) {
      console.error('Failed to fetch account details:', error);
    }
  };
  

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getEmployees();
      if (response && Array.isArray(response.employees)) {
        setEmployees(response.employees);
      } else {
        console.error('Invalid response format for employees:', response);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const updatedData = { ...formData, Account_ID: id };
        await API_Accounts_Class.updateAccount(updatedData);
        setStatus(true);
        setTimeout(() => {
          navigate('/accounts');
        }, 700);
      } catch (error) {
        setStatus(false);
        console.error('Failed to update account:', error);
      }
    }
    setValidated(true);
  };

  // Display loading message if data is still being fetched
  if (loading) {
    return (
      <CCard>
        <CCardHeader>
          <h3>Chỉnh sửa tài khoản</h3>
        </CCardHeader>
        <CCardBody>
          <p>Loading...</p>
        </CCardBody>
      </CCard>
    );
  }

  return (
    <CCard>
      <CCardHeader>
        <h3>Chỉnh sửa tài khoản</h3>
      </CCardHeader>
      <CCardBody>
        <CForm className="row g-3" noValidate onSubmit={handleSubmit} validated={validated}>
          {status === false && (
            <CCol md={12}>
              <CAlert color="danger">Chỉnh sửa tài khoản thất bại</CAlert>
            </CCol>
          )}
          {status === true && (
            <CCol md={12}>
              <CAlert color="success">Chỉnh sửa tài khoản thành công</CAlert>
            </CCol>
          )}

          <CCol md={6}>
            <CFormLabel htmlFor="Username">
              <strong>Tên đăng nhập</strong>
            </CFormLabel>
            <CFormInput
              type="text"
              id="Username"
              name="Username"
              placeholder="Nhập tên đăng nhập"
              required
              onChange={handleChange}
              value={formData.Username}
              feedbackInvalid="Vui lòng nhập tên đăng nhập"
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
              <option value="0">Hoạt động</option>
              <option value="1">Không hoạt động</option>
            </CFormSelect>
          </CCol>

          <CCol md={12}>
            <CButton color="primary" type="submit">
              Cập nhật tài khoản
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default Accounts_Edit;
