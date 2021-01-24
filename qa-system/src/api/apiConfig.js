/**
 * api and network request related
 */
import { message } from 'antd'
import axios from 'axios'

export const apis = {
  answers: 'api/answers',
  keywords: 'api/keywords',
}

// HTTP_actions
export const HTTP_GET = 'get'
export const HTTP_POST = 'post'
export const HTTP_PUT = 'put'
export const HTTP_DELETE = 'delete'

export const prefix = 'http://127.0.0.1:5000/'

/**
 *标准化网络请求的处理过程，包括错误处理等
 */ 
export function triggerAPIRequest(url, httpAction, data={}){
  let promise
  switch(httpAction){
    case HTTP_GET:
      promise = axios.get(url)
      break
    case HTTP_POST:
      promise = axios.post(url, data)
      break
    case HTTP_PUT:
      promise = axios.put(url, data)
      break
    case HTTP_DELETE:
      promise = axios.delete(url)
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
      const { status, statusText } = response
      const errorMessage = `failed on api request ${url}; status: ${status} ${statusText}`
      message.error(errorMessage)
      return Promise.reject(errorMessage)
    })
    return result
}