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

export const getStore_Products = async (page = 1, pageSize = 10) => {
  const response = await fetchWithAuth(
    API_config.Store_Products.list + '?page=' + page + '&pageSize=' + pageSize,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return handleResponse(response)
}

export const changestatus = async (id, status) => {
  const response = await fetchWithAuth(API_config.Store_Products.updatestatus + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: status }),
  })
  return handleResponse(response)
}

export const Backdata = async () => {
  const response = await fetchWithAuth(API_config.Store_Products.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getStoreById = async (id) => {
  const response = await fetchWithAuth(API_config.Store_Products.list + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const createStore = async (store) => {
  const response = await fetchWithAuth(API_config.Store_Products.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store),
  })
  return handleResponse(response)
}

export const updateStore = async (store) => {
  const response = await fetchWithAuth(
    API_config.Store_Products.update + '/' + store.store_products_ID,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store),
    },
  )
  return handleResponse(response)
}

export const deleteStore = async (id) => {
  const response = await fetchWithAuth(API_config.Store_Products.delete + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}
