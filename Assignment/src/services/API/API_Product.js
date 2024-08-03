import { json } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'

export default class API_Product {
  async changestatus(id, status) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.products.updatestatus + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: status }),
    })
    return this._handleResponse(response)
  }

  async backdata() {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.products.backdata, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }

  async getAllProducts() {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.products.list, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }

  async getAllProductAdd() {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.products.list_add, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }
  // Function to get product details by ID
  async getProductById(id) {
    const response = await this._fetchWithAuth(`${API_config.products.list}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }
  async createOrder(order) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.orders.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    return this._handleResponse(response)
  }

  async updateOrder(order) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.orders.update, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    return this._handleResponse(response)
  }

  async deleteOrder(order) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.orders.delete, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    return this._handleResponse(response)
  }

  async _fetchWithAuth(url, options) {
    const token = getItem('token')
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    }
    return fetch(url, options)
  }

  async _handleResponse(response) {
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
}
