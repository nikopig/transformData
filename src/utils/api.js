import axios from 'axios'
import qs from 'qs'
import runConfig from './config'
let baseUrl = runConfig.runType === 'dev' ? '/api/' : '/conduit/config/'
axios.defaults.timeout = 5000 // 响应时间
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
// axios.defaults.baseURL = '' // 配置接口地址
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
console.log(config)
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
export function fetch (url, params, type) {
  return new Promise((resolve, reject) => {
    axios[type](url, params)
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
    post (operator, params) {
        let url = baseUrl + operator
        return fetch(url, params, 'post')
    },
    get (operator, params) {
        let url = baseUrl + operator
        return fetch(url, params, 'get')
    }
  // getDatabase (params) {
  //   return fetch('/config/getDatabase', params)
  // },
  // getTable (params) {
  //   return fetch('/config/getTable', params)
  // },
  // getColumns (params) {
  //   return fetch('/config/getCol', params)
  // },
  // getConfigInfo (params) {
		// console.log(params)
  //   return fetch('/config/getConfigInfo', params, 'post')
  // }
}
