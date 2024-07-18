
export default class API_User {
  async login(credentials) {
    const response = await fetch(`${API_URL}/accounts/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    return response.json()
  }
}
