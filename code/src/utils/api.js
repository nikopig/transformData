import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 5000 // 响应时间
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
axios.defaults.baseURL = '/conduit' // 配置接口地址
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (res.status !== 200) {
      // _.toast(res.data.msg);
      return Promise.reject(res)
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回一个Promise(发送post请求)
export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}
export default {
  // getDatabase (params) {
  //   return fetch('/config/getDatabase', params)
  // },
  // getTable (params) {
  //   return fetch('/config/getTable', params)
  // },
  getColumns (params) {
    return fetch('/config/getCol', params)
  },
  getConfigInfo (params) {
    return fetch('/config/getConfigInfo', params)
  }
}
