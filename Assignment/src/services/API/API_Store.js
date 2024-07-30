import { json } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'
export default class API_Store {
  async getStore(page = 1, pageSize = 10) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(
      API_config.Stores.list + '?page=' + page + '&pageSize=' + pageSize,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return this._handleResponse(response)
  }
  async changestatus(id, status){
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Stores.updatestatus + '/' + id,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status:status}),
    })
    return this._handleResponse(response)
  }
  async Backdata(){
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Stores.backdata,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }
  async getStorebyid(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Stores.list + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }
  async createStore(Store) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Stores.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Store),
    })
    return this._handleResponse(response)
  }

  async updateStore(Store) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Stores.update + '/' + Store.Store_ID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Store),
    })
    return this._handleResponse(response)
  }

  async delete(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Stores.delete + '/' + id, {
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
