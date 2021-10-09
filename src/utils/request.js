import axios from 'axios'
const service = axios.create({
  baseURL: '',
  timeout: 30000,
})

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 0 && res.code !== 200) {
      return Promise.reject(res)
    } else {
      return res
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
