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

// Function to delete a product by ID
export const deleteAPI = async (productId, navigate) => {
  const response = await _fetchWithAuth(`${API_config.products.delete}/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: productId }),
  })
  return _handleResponse(response, navigate)
}

// Function to change the status of a product
export const changestatus = async (id, status, navigate) => {
  const response = await _fetchWithAuth(`${API_config.products.updatestatus}/${id}`, {
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
  const response = await _fetchWithAuth(API_config.products.backdata, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to get a paginated list of products
export const getProducts = async (page = 1, pageSize = 10, navigate) => {
  const response = await _fetchWithAuth(
    `${API_config.products.list}?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return _handleResponse(response, navigate)
}

// Function to get product details by ID
export const getProductById = async (id, navigate) => {
  const response = await _fetchWithAuth(`${API_config.products.list}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}

// Function to create a new product
export const createProduct = async (product, navigate) => {
  // Create FormData
  const formData = new FormData()
  // Append all fields to FormData
  for (const key in product) {
    if (product.hasOwnProperty(key)) {
      formData.append(key, product[key])
    }
  }

  const response = await _fetchWithAuth(API_config.products.create, {
    method: 'POST',
    body: formData, // Use FormData instead of JSON
  })
  return _handleResponse(response, navigate)
}
export const searchProduct = async (searchKey, navigate) => {
  const response = await _fetchWithAuth(`${API_config.products.search}?searchkey=${searchKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return _handleResponse(response, navigate)
}
// Function to update an existing product
export const updateProduct = async (product, navigate) => {
  // Create FormData
  const formData = new FormData()
  // Append all fields to FormData
  for (const key in product) {
    if (product.hasOwnProperty(key)) {
      formData.append(key, product[key])
    }
  }

  const response = await _fetchWithAuth(`${API_config.products.update}/${product.Product_ID}`, {
    method: 'PUT',
    body: formData, // Use FormData instead of JSON
  })
  return _handleResponse(response, navigate)
}
