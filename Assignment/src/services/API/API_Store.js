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

export const getStore = async (page = 1, pageSize = 10) => {
  const response = await fetchWithAuth(
    `${API_config.store.list}?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return handleResponse(response)
}

export const getAllStoreAdd = async () => {
  const response = await fetchWithAuth(API_config.store.list_add, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const changestatus = async (id, status) => {
  const response = await fetchWithAuth(`${API_config.Stores.updatestatus}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  return handleResponse(response)
}

export const Backdata = async () => {
  const response = await fetchWithAuth(API_config.Stores.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getStorebyid = async (id) => {
  const response = await fetchWithAuth(`${API_config.Stores.list}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const createStore = async (store) => {
  const response = await fetchWithAuth(API_config.Stores.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store),
  })
  return handleResponse(response)
}

export const updateStore = async (store) => {
  const response = await fetchWithAuth(`${API_config.Stores.update}/${store.Store_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(store),
  })
  return handleResponse(response)
}

export const deleteStore = async (id) => {
  const response = await fetchWithAuth(`${API_config.Stores.delete}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}
