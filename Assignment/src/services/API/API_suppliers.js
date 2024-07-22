import { json } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'

export default class API_Suppliers {
  async getsuppliers(page = 1, pageSize = 10) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(
      API_config.suppliers.list + '?page=' + page + '&pageSize=' + pageSize,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return this._handleResponse(response)
  }
  async getsuppliersbyid(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.suppliers.list + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }
  async createsuppliers(suppliers) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.suppliers.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(suppliers),
    })
    return this._handleResponse(response)
  }

  async updatesuppliers(suppliers) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(
      API_config.suppliers.update + '/' + suppliers.Supplier_ID,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(suppliers),
      },
    )
    return this._handleResponse(response)
  }

  async deletesuppliers(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.suppliers.delete + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
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
