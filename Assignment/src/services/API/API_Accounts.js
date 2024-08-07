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

export const getAccounts = async (page = 1, pageSize = 10) => {
  const response = await fetchWithAuth(
    API_config.Accounts.list + '?page=' + page + '&pageSize=' + pageSize,
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
  const response = await fetchWithAuth(API_config.Accounts.backdata + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: status }),
  })
  return handleResponse(response)
}

export const Backdata = async () => {
  const response = await fetchWithAuth(API_config.Accounts.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getAccountById = async (id) => {
  const response = await fetchWithAuth(API_config.Accounts.list + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const createAccount = async (account) => {
  const response = await fetchWithAuth(API_config.Accounts.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  })
  return handleResponse(response)
}

export const updateAccount = async (account) => {
  const response = await fetchWithAuth(API_config.Accounts.update + '/' + account.Account_ID, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  })
  return handleResponse(response)
}

export const deleteAccount = async (id) => {
  const response = await fetchWithAuth(API_config.Accounts.delete + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}
