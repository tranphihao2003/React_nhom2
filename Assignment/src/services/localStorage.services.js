export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`lỗi khi lưu ${key} vào localStorage`, error)
  }
}
export const getItem = (key) => {
  try {
    const serializedValue = localStorage.getItem(key)
    if (serializedValue === null) {
      return undefined
    }
    return JSON.parse(serializedValue)
  } catch (error) {
    console.error(`lỗi khi lấy ${key} từ localStorage`, error)
    return undefined
  }
}
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`lỗi khi xóa ${key} từ localStorage`, error)
  }
}
export const clearAll = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('lỗi khi xóa tất cả localStorage', error)
  }
}
// Hàm kiểm tra thời hạn của token
export const isTokenExpired = (token) => {
  if (!token) return true // Nếu không có token, coi như hết hạn
  try {
    const decodedToken = parseJwt(token) // Giả sử parseJwt là hàm parse token
    // Lấy thời gian hết hạn từ token, ví dụ: decodedToken.exp
    const tokenExpiration = decodedToken.exp * 1000 // Convert sang miliseconds
    const currentTimestamp = new Date().getTime() // Thời gian hiện tại
    return tokenExpiration < currentTimestamp // So sánh với thời gian hiện tại
  } catch (error) {
    console.error('Lỗi khi kiểm tra thời hạn của token:', error)
    return true // Nếu có lỗi, coi như token đã hết hạn
  }
}

// Hàm giả định parseJwt để giải mã token
const parseJwt = (token) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )
  return JSON.parse(jsonPayload)
}
