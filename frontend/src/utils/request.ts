import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
    baseURL: 'http://127.0.0.1:8000', // url = base url + request url
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config: any) => {
        if(sessionStorage.getItem('token')){
            config.headers.Authorization = "Token " + sessionStorage.getItem('token');
        }
        return config;
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        return Promise.resolve(response.data)
    },
    err => {
        ElMessage({
            showClose: true,
            message: err.response.data[Object.keys(err.response.data)[0]][0]||err,
            type: 'error',
        })
        return Promise.reject(err)
    }
)

export default service

