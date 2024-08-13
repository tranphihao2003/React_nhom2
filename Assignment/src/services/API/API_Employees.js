import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'

const fetchWithAuth = async (url, options = {}) => {
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

export const changeStatus = async (id, status, navigate) => {
  const response = await fetchWithAuth(`${API_config.employees.updatestatus}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  return handleResponse(response)
}

export const backdata = async () => {
  const response = await fetchWithAuth(API_config.employees.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getEmpoyees = async (page = 1, pageSize = 10) => {
  const response = await fetchWithAuth(`${API_config.employees.list}?page=${page}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getAllEmpoyeesAdd = async () => {
  const response = await fetchWithAuth(API_config.employees.list_add, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const getEmpoyees_Detail = async (id) => {
  const response = await fetchWithAuth(`${API_config.employees.list_detail}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export const createEmpoyees = async (employees) => {
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
  console.log(employees.Employee_ID)
  const response = await fetchWithAuth(`${API_config.employees.update}/${employees.Employee_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employees),
  })
  return handleResponse(response)
}

export const deleteEmployees = async (employees) => {
  const response = await fetchWithAuth(API_config.employees.delete, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employees),
  })
  return handleResponse(response)
}

export const deleteEmployee = async (id) => {
  const response = await fetchWithAuth(`${API_config.employees.delete}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}
