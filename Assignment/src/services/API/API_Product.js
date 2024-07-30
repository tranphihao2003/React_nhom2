import { json } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'

export default class API_Product {
  async getProducts() {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.products.list, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }

  async createProduct(product) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.products.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    return this._handleResponse(response)
  }

  async updateProduct(product) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.products.update, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    return this._handleResponse(response)
  }

  async deleteProduct(product) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.products.delete, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
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
