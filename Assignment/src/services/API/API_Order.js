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

export const thongke = async (storeId, day, month, year) => {
  const response = await fetchWithAuth(API_config.orders.thongke, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ storeId, day, month, year }),
  })
  return handleResponse(response)
}

export const thongkebyid = async (id, storeId, month, year) => {
  const response = await fetchWithAuth(API_config.orders.thongkebyid, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, storeId, month, year }),
  })
  return handleResponse(response)
}

export const thongkebyemployee = async (id, month, year) => {
  const response = await fetchWithAuth(API_config.orders.thongkebyemployee, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, month, year }),
  })
  return handleResponse(response)
}

export const changestatus = async (id, status) => {
  const response = await fetchWithAuth(API_config.orders.updatestatus + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  return handleResponse(response)
}

export const backdata = async () => {
  const response = await fetchWithAuth(API_config.orders.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getOrders = async (page = 1, pageSize = 10) => {
  const response = await fetchWithAuth(
    API_config.orders.list + '?page=' + page + '&pageSize=' + pageSize,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return handleResponse(response)
}

export const getOrder_Detail = async (id) => {
  const response = await fetchWithAuth(API_config.orders.list_detail + '/' + id, {
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
  const response = await fetchWithAuth(API_config.orders.update + '/' + order.Order_ID, {
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
