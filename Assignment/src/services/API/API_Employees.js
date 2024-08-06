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

const handleResponse = async (response, navigate) => {
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

export const changestatus = async (id, status, navigate) => {
  const response = await fetchWithAuth(API_config.employees.updatestatus + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: status }),
  })
  return handleResponse(response, navigate)
}

export const Backdata = async () => {
  const response = await fetchWithAuth(API_config.employees.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getEmployees = async (page = 1, pageSize = 10) => {
  const response = await fetchWithAuth(
    API_config.employees.list + '?page=' + page + '&pageSize=' + pageSize,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return handleResponse(response)
}

export const getEmployeesDetail = async (id) => {
  const response = await fetchWithAuth(API_config.employees.list_detail + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const createEmployees = async (employees) => {
  const response = await fetchWithAuth(API_config.employees.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employees),
  })
  return handleResponse(response)
}

export const updateEmployees = async (employees) => {
  const response = await fetchWithAuth(API_config.employees.update + '/' + employees.Employee_ID, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employees),
  })
  return handleResponse(response)
}



export const deleteAPI = async (id) => {
  const response = await fetchWithAuth(API_config.employees.delete + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}
