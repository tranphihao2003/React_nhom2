import API_config from '../../config/API_config'

export default class API_User {
  async login(credentials) {
    const response = await fetch(`${API_config.Users.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    return response.json()
  }
}
