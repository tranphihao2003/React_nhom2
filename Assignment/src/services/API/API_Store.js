import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'

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

// Function to get stores
export const getStore = async (page = 1, pageSize = 10, navigate) => {
  const response = await _fetchWithAuth(
    `${API_config.stores.list}?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return _handleResponse(response, navigate)
}

// Function to change the status of a store
export const changestatus = async (id, status, navigate) => {
  const response = await _fetchWithAuth(`${API_config.stores.updatestatus}/${id}`, {
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
  const response = await _fetchWithAuth(API_config.stores.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to get store by ID
export const getStoreById = async (id, navigate) => {
  const response = await _fetchWithAuth(`${API_config.stores.list}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to create a new store
export const createStore = async (store, navigate) => {
  const response = await _fetchWithAuth(API_config.stores.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store),
  })
  return _handleResponse(response, navigate)
}

// Function to update an existing store
export const updateStore = async (store, navigate) => {
  const response = await _fetchWithAuth(`${API_config.stores.update}/${store.Store_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store),
  })
  return _handleResponse(response, navigate)
}

// Function to delete a store by ID
export const deleteAPI = async (id, navigate) => {
  const response = await _fetchWithAuth(`${API_config.stores.delete}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return _handleResponse(response, navigate)
}
