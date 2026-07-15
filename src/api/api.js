import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

api.interceptors.response.use(
  (response) => {
    const { success, data, message } = response.data

    if (!success) {
      alert(message)

      return Promise.reject({
        success,
        message,
      })
    }

    return data
  },
  (error) => {
    // HTTP 오류 공통 처리
    if (error.response) {
      switch (error.response.status) {
        case 400:
          alert('잘못된 요청입니다.')
          break
        case 401:
          alert('로그인이 필요합니다.')
          break
        case 403:
          alert('접근 권한이 없습니다.')
          break
        case 404:
          alert('요청한 API를 찾을 수 없습니다.')
          break
        case 500:
          alert('서버 오류가 발생했습니다.')
          break
        default:
          alert('알 수 없는 오류가 발생했습니다.')
      }
    } else {
      alert('서버와 연결할 수 없습니다.')
    }

    return Promise.reject(error)
  },
)

export default api