import { json, Navigate } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'
import Swal from 'sweetalert2'
export default class API_genres {
  async getgenres(page = 1, pageSize = 10) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(
      API_config.genres.list + '?page=' + page + '&pageSize=' + pageSize,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return this._handleResponse(response)
  }
  async getgenresbyid(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.genres.list + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }
  async creategenres(genres) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.genres.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(genres),
    })
    return this._handleResponse(response)
  }

  async updategenres(genres) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(
      API_config.genres.update + '/' + genres.Supplier_ID,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(genres),
      },
    )
    return this._handleResponse(response)
  }

  async deletegenres(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.genres.delete + '/' + id, {
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
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Phiên đăng nhập đã hết hạn',
        timer: 2000,
      }).then(() => {
        Navigate('/#/login')
      })
    }
    try {
      return await response.json()
    } catch (error) {
      console.error('Failed to parse JSON:', error)
      return null
    }
  }
}
