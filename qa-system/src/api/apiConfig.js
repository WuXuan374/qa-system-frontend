/**
 * api and network request related
 */
import { message, Spin } from 'antd'
import axios from 'axios'
import ReactDOM from 'react-dom'

export const apis = {
  answers: 'qa/answers',
  hints: 'qa/hints',
}

// HTTP_actions
export const HTTP_GET = 'get'
export const HTTP_POST = 'post'
export const HTTP_PUT = 'put'
export const HTTP_DELETE = 'delete'

// TODO: modify in production environment
export const prefix = 'http://127.0.0.1:5000/'
export const loadingSpinnerId = "loading-spinner"


/**
 *标准化网络请求的处理过程，包括错误处理等
 */ 
export function triggerAPIRequest(url, httpAction, data={}){
  let promise
  const axiosInstance = getAxios()
  switch(httpAction){
    case HTTP_GET:
      promise = axiosInstance.get(url)
      break
    case HTTP_POST:
      promise = axiosInstance.post(url, data)
      break
    case HTTP_PUT:
      promise = axiosInstance.put(url, data)
      break
    case HTTP_DELETE:
      promise = axiosInstance.delete(url)
      break
    default: break
  }
  if (!promise){
    message.error("Invalid HTTP ACTION")
    return Promise.reject("Invalid HTTP ACTION")
  } 
  let result = promise
    .then((response) => {
      const { data, status, statusText } = response
      if (status !== 200){
        const errorMessage = `failed on api request ${url}; status: ${status} ${statusText}`
        message.error(errorMessage)
        return Promise.reject(errorMessage)
      } else {
        return Promise.resolve(data)
      }
    })
    /**
     * error information from axios
     * config: {url: "http://127.0.0.1:5000/api/keyword", method: "get", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
        isAxiosError: true
        request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
        response: {data: "<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final/…ly please check your spelling and try again.</p>↵", status: 404, statusText: "NOT FOUND", headers: {…}, config: {…}, …}
        toJSON: ƒ toJSON()
        message: "Request failed with status code 404"
        stack: "Error: Request failed with status code 404↵    at createError (http://localhost:3000/static/js/0.chunk.js:40305:15)↵    at settle (http://localhost:3000/static/js/0.chunk.js:40539:12)↵    at XMLHttpRequest.handleLoad (http://localhost:3000/static/js/0.chunk.js:39779:7)"
        __proto__: Object
     */
    .catch((error) => {
      const { response } = error
      if (!response) return Promise.reject()
      // 如果有返回错误码等信息，则显示详细的错误提醒
      const { status, statusText } = response
      const errorMessage = `failed on api request ${url}; status: ${status} ${statusText}`
      message.error(errorMessage)
      return Promise.reject(errorMessage)
    })
    return result
}

function startLoadingSpinner(timeout=500){
  // 500ms内网络请求没有完成，则出现一个不断转动的圈圈，提示用户
  // 返回一个计时器
  return setTimeout(() =>{
    const spinnerDom = document.createElement("div")
    spinnerDom.setAttribute("id", loadingSpinnerId)
    document.body.appendChild(spinnerDom)
    document.getElementById("root").style.opacity = 0.3
    ReactDOM.render(<Spin tip="loading..." size="large" style={{
      position: 'fixed',
      left: '50%',
      top: '50%',
    }}/>, spinnerDom)
  },timeout)
}

function cancelLoadingSpinner(loadingSpinnerTimer){
  // 如果定时器已经生效，出现了圈圈，则把圈圈移除
  if (document.getElementById(loadingSpinnerId)){
    document.body.removeChild(document.getElementById(loadingSpinnerId))
    document.getElementById("root").style.opacity = 1
  } else {
    // 如果定时器还未生效，清除定时器即可
    clearTimeout(loadingSpinnerTimer)
  }
}

function getAxios(){
  // 通过axios.create来定制一些配置信息
  const instance = axios.create({
    baseURL: prefix,
    // If the request takes longer than 60 seconds, it will be aborted
    timeout: 1000 * 60,
  })
  // 发送IO请求后，我们会产生一个转动的圈圈，提示用户正在进行请求
  let loadingSpinnerTimer

  // intercept requests or responses before they are handled by then or catch.
  instance.interceptors.request.use((config) => {
    // 发送请求之前所做的内容
    loadingSpinnerTimer = startLoadingSpinner()
    return config
  }, (error) => {
    // 请求出错时所做的内容
    return Promise.reject(error)
  })

  instance.interceptors.response.use((response) => {
    // status code 2xx
    cancelLoadingSpinner(loadingSpinnerTimer)
    return Promise.resolve(response)
  }, (error) => {
    cancelLoadingSpinner(loadingSpinnerTimer)
    return Promise.reject(error)
  })

  return instance
}