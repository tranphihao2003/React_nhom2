import { json } from 'react-router-dom'
import API_config from '../../config/API_config'
import { getItem, removeItem } from '../localStorage.services'

export default class API_Employees {
  async changeStatus(id, status, navigate) {
    //Thay đổi trạng thái và dừng và khôi phục
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.employees.updatestatus + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: status }),
    })
    return this._handleResponse(response, navigate)
  }

  async backdata() {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.employees.backdata, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }

  async getEmpoyees(page = 1, pageSize = 10) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(
      API_config.employees.list + '?page=' + page + '&pageSize=' + pageSize,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return this._handleResponse(response)
  }

  async getEmpoyees_Detail(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.employees.list_detail + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return this._handleResponse(response)
  }

  async createEmpoyees(employees) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.employees.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employees),
    })
    return this._handleResponse(response)
  }

  async updateEmployees(employees) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(
      API_config.employees.update + '/' + employees.Employee_ID,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employees),
      },
    )
    return this._handleResponse(response)
  }

  async deleteEmployees(employees) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.employees.delete, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employees),
    })
    return this._handleResponse(response)
  }

  async delete(id) {
    const token = getItem('token')
    const response = await this._fetchWithAuth(API_config.employees.delete + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
