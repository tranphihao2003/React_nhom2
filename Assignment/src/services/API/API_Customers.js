import { json, useNavigate } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'
import Swal from 'sweetalert2'

// Function to handle authenticated fetch requests
const _fetchWithAuth = async (url, options) => {
  const token = getItem('token')
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  }
  return fetch(url, options)
}

// Function to handle API responses
const _handleResponse = async (response, navigate) => {
  if (response.status === 401 || response.status === 403) {
    removeItem('token')
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Phiên đăng nhập đã hết hạn',
      timer: 2000,
    }).then(() => {
      navigate('/login')
    })
    return null
  }
  try {
    const data = await response.json()
    return {
      status: response.status,
      data: data,
    }
  } catch (error) {
    return {
      status: response.status,
      data: null,
    }
  }
}

// Function to get genres
export const getCustomers = async (page = 1, pageSize = 10, navigate) => {
  const response = await _fetchWithAuth(
    `${API_config.Customers.list}?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return _handleResponse(response, navigate)
}

// Function to get genre by ID
export const getCustomersById = async (id, navigate) => {
  const response = await _fetchWithAuth(`${API_config.Customers.list}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to create a new genre
export const createCustomers = async (customers, navigate) => {
  const response = await _fetchWithAuth(API_config.Customers.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customers),
  })
  return _handleResponse(response, navigate)
}
export const changestatus = async (id, status, navigate) => {
  const response = await _fetchWithAuth(`${API_config.Customers.updatestatus}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  return _handleResponse(response, navigate)
}

// Function to retrieve deleted data
export const Backdata = async (navigate) => {
  const response = await _fetchWithAuth(API_config.Customers.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to update an existing genre
export const updateCustomers = async (customers, navigate) => {
  console.log(customers.Customer_ID)
  const response = await _fetchWithAuth(`${API_config.Customers.update}/${customers.Customer_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customers),
  })
  return _handleResponse(response, navigate)
}

// Function to delete a genre by ID
export const deleteAPI = async (id, navigate) => {
  const response = await _fetchWithAuth(`${API_config.Customers.delete}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}
