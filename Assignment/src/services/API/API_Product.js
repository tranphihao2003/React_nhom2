import API_config from '../../config/API_config'
export default class API_Product {
  async getProducts() {
    const response = await fetch(API_config.products.list)
    return response.json()
  }
  async createProduct(product) {
    const response = await fetch(API_config.products.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    return response.json()
  }
  async updateProduct(product) {
    const response = await fetch(API_config.products.update, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    return response.json()
  }
  async deleteProduct(product) {
    const response = await fetch(API_config.products.delete, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    return response.json()
  }
}
