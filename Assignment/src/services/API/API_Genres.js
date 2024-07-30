import { json } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'

export default class API_Genres {
  async changestatus(id, status) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.genres.updatestatus + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: status }),
    })
    return this._handleResponse(response)
  }
  async getGenres() {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.genres.list, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }
  //lấy dữ liệu đã xóa
  async Backdata() {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.genres.backdata, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }

  async createGenres(genres) {
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

  async updateGenres(genres) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.genres.update, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(genres),
    })
    return this._handleResponse(response)
  }

  async delete(genres) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.genres.delete + '/' + genres, {
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