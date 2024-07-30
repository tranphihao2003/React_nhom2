import API_config from '../../config/API_config'
import { removeItem } from '../localStorage.services'


const UserLogin = async (userData) => {
  const response = await fetch(`${API_config.Users.login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  return response.json()
}
const UserLogout = () => {
  removeItem('token')
}
const UserVerify = async (token) => {
  const response = await fetch(`${API_config.Users.verify}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}
export { UserLogin, UserLogout, UserVerify }
