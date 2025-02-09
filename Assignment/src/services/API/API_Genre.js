import { json, useNavigate } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'
import Swal from 'sweetalert2'

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
      timer: 2000,
    }).then(() => {
      navigate('/login')
    })
    return null
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

// Function to get genres
export const getGenres = async (page = 1, pageSize = 10, navigate) => {
  const response = await _fetchWithAuth(
    `${API_config.genres.list}?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return _handleResponse(response, navigate)
}

// Function to get genre by ID
export const getGenreById = async (id, navigate) => {
  const response = await _fetchWithAuth(`${API_config.genres.list}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to create a new genre
export const createGenre = async (genre, navigate) => {
  const response = await _fetchWithAuth(API_config.genres.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(genre),
  })
  return _handleResponse(response, navigate)
}
export const changestatus = async (id, status, navigate) => {
  const response = await _fetchWithAuth(`${API_config.genres.updatestatus}/${id}`, {
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
  const response = await _fetchWithAuth(API_config.genres.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to update an existing genre
export const updateGenre = async (genre, navigate) => {
  console.log(genre)
  const response = await _fetchWithAuth(`${API_config.genres.update}/${genre.Genre_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(genre),
  })
  return _handleResponse(response, navigate)
}

// Function to delete a genre by ID
export const deleteAPI = async (id, navigate) => {
  const response = await _fetchWithAuth(`${API_config.genres.delete}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}
