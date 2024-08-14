import { getItem, removeItem } from '../localStorage.services'
import API_config from '../../config/API_config'

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

export const changeStoreProductStatus = async (id, status) => {
  const response = await fetchWithAuth(`${API_config.Store_Products.updatestatus}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  return handleResponse(response)
}

export const backStoreProductData = async () => {
  const response = await fetchWithAuth(API_config.Store_Products.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getStoreProduct = async (page = 1, pageSize = 10) => {
  const response = await fetchWithAuth(
    `${API_config.orders.list}?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return handleResponse(response)
}

export const getAllStoreProductAdd = async (id) => {
  const response = await fetchWithAuth(`${API_config.Store_Products.list_add}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getProductById = async (store_id, product_id) => {
  const response = await fetchWithAuth(
    `${API_config.Store_Products.list_byid}?store_id=${store_id}&product_id=${product_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return handleResponse(response)
}

export const createStoreProduct = async (store_product) => {
  const response = await fetchWithAuth(API_config.Store_Products.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store_product),
  })
  return handleResponse(response)
}

export const updateStoreProduct = async (store_product) => {
  const response = await fetchWithAuth(API_config.Store_Products.update, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store_product),
  })
  return handleResponse(response)
}

export const deleteStoreProduct = async (store_product) => {
  const response = await fetchWithAuth(API_config.Store_Products.delete, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store_product),
  })
  return handleResponse(response)
}
