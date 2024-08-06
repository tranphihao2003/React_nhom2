import { json } from 'react-router-dom';
import API_config from '../../config/API_config';
import { getItem, removeItem } from '../localStorage.services';

export default class API_Store_Products {
  async getStore_Products(page = 1, pageSize = 10) {
    const token = getItem('token');
    const response = await this._fetchWithAuth(
      API_config.store_products.list + '?page=' + page + '&pageSize=' + pageSize,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return this._handleResponse(response);
  }

  async changeStatus(id, status) {
    const token = getItem('token');
    const response = await this._fetchWithAuth(API_config.store_products.stop + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: status }),
    });
    return this._handleResponse(response);
  }

  async Backdata() {
    const token = getItem('token');
    const response = await this._fetchWithAuth(API_config.store_products.backdata, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return this._handleResponse(response);
  }

  async getStoreById(id) {
    const token = getItem('token');
    const response = await this._fetchWithAuth(API_config.store_products.list + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return this._handleResponse(response);
  }

  async createStore(store) {
    const token = getItem('token');
    const response = await this._fetchWithAuth(API_config.store_products.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store),
    });
    return this._handleResponse(response);
  }

  async updateStore(store) {
    const token = getItem('token');
    const response = await this._fetchWithAuth(
      API_config.store_products.update + '/' + store.store_products_ID,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(store),
      });
    return this._handleResponse(response);
  }

  async delete(id) {
    const token = getItem('token');
    const response = await this._fetchWithAuth(API_config.store_products.delete + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return this._handleResponse(response);
  }

  async _fetchWithAuth(url, options) {
    const token = getItem('token');
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    return fetch(url, options);
  }

  async _handleResponse(response) {
    if (response.status === 401 || response.status === 403) {
      removeItem('token');
      window.location.replace('/#/login');
    }
    try {
      return await response.json();
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return null;
    }
  }
}
