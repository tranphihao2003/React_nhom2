import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'
import Swal from 'sweetalert2'

const _fetchWithAuth = async (url, options) => {
  const token = getItem('token')
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  }
  return fetch(url, options)
}

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
  }
  try {
    return await response.json()
  } catch (error) {
    console.error('Failed to parse JSON:', error)
    return null
  }
}

export const changestatus = async (id, status, navigate) => {
  const response = await _fetchWithAuth(API_config.suppliers.updatestatus + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  return _handleResponse(response, navigate)
}

export const Backdata = async (navigate) => {
  const response = await _fetchWithAuth(API_config.suppliers.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

export const getsuppliers = async (page = 1, pageSize = 10, navigate) => {
  const response = await _fetchWithAuth(
    API_config.suppliers.list + '?page=' + page + '&pageSize=' + pageSize,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return _handleResponse(response, navigate)
}

export const getsuppliersbyid = async (id, navigate) => {
  const response = await _fetchWithAuth(API_config.suppliers.list + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

export const createsuppliers = async (suppliers, navigate) => {
  const response = await _fetchWithAuth(API_config.suppliers.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(suppliers),
  })
  return _handleResponse(response, navigate)
}

export const updatesuppliers = async (suppliers, navigate) => {
  const response = await _fetchWithAuth(API_config.suppliers.update + '/' + suppliers.Supplier_ID, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(suppliers),
  })
  return _handleResponse(response, navigate)
}

export const deleteAPI = async (id, navigate) => {
  const response = await _fetchWithAuth(API_config.suppliers.delete + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}
