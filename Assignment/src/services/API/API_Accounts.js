import { json } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'

export default class API_Accounts {
  async getAccounts(page = 1, pageSize = 10) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(
      API_config.Accounts.list + '?page=' + page + '&pageSize=' + pageSize,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return this._handleResponse(response)
  }
  async changestatus(id, status){
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Accounts.backdata + '/' + id,{
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
    const response = await this._fetchWithAuth(API_config.Accounts.backdata,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }

  async getAccountById(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Accounts.list + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }

  async createAccount(account) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Accounts.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    })
    return this._handleResponse(response)
  }

  async updateAccount(account) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Accounts.update + '/' + account.Account_ID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    })
    return this._handleResponse(response)
  }

  async deleteAccount(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.Accounts.delete + '/' + id, {
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
