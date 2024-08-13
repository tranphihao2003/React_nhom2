import { json } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'

const fetchWithAuth = async (url, options) => {
  const token = getItem('token')
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  }
  return fetch(url, options)
}

const handleResponse = async (response) => {
  if (response.status === 401 || response.status === 403) {
    removeItem('token')
    window.location.replace('/#/login')
  }
  try {
    return await response.json()
  } catch (error) {
    console.error('Failed to parse JSON:', error)
    return null
  }
}

export const changestatus = async (id, status) => {
  const response = await fetchWithAuth(API_config.products.updatestatus + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  return handleResponse(response)
}

export const backdata = async () => {
  const response = await fetchWithAuth(API_config.products.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getAllProducts = async () => {
  const response = await fetchWithAuth(API_config.products.list, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getAllProductAdd = async () => {
  const response = await fetchWithAuth(API_config.products.list_add, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getProductById = async (id) => {
  const response = await fetchWithAuth(`${API_config.products.list}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const createOrder = async (order) => {
  const response = await fetchWithAuth(API_config.orders.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
  return handleResponse(response)
}

export const updateOrder = async (order) => {
  const response = await fetchWithAuth(API_config.orders.update, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
  return handleResponse(response)
}

export const deleteOrder = async (order) => {
  const response = await fetchWithAuth(API_config.orders.delete, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
  return handleResponse(response)
}
