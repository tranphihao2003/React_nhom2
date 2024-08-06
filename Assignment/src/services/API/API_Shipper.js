import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

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
      preConfirm: () => {
        navigate('/login')
      },
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

// Function to retrieve deleted data
export const Backdata = async (navigate) => {
  const response = await _fetchWithAuth(API_config.Shippers.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to change the status of a shipper
export const changestatus = async (id, status, navigate) => {
  const response = await _fetchWithAuth(`${API_config.Shippers.updatestatus}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  return _handleResponse(response, navigate)
}

// Function to get a paginated list of shippers
export const getShippers = async (page = 1, pageSize = 10, navigate) => {
  const response = await _fetchWithAuth(
    `${API_config.Shippers.list}?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return _handleResponse(response, navigate)
}

// Function to get shipper details by ID
export const getShipperById = async (id, navigate) => {
  const response = await _fetchWithAuth(`${API_config.Shippers.list}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to create a new shipper
export const createShipper = async (shipper, navigate) => {
  const response = await _fetchWithAuth(API_config.Shippers.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shipper),
  })
  return _handleResponse(response, navigate)
}

// Function to update an existing shipper
export const updateShipper = async (shipper, navigate) => {
  const response = await _fetchWithAuth(`${API_config.Shippers.update}/${shipper.Shipper_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shipper),
  })
  return _handleResponse(response, navigate)
}

// Function to delete a shipper by ID
export const deleteAPI = async (id, navigate) => {
  const response = await _fetchWithAuth(`${API_config.Shippers.delete}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}
