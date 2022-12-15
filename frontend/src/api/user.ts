import request from '@/utils/request'
interface signupParams {
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    email: String,
    is_active: Boolean
}
export function signup(data: signupParams) {
    return request({
        url: '/users/',
        method: 'post',
        data
    })
}

export function Login(data: signupParams) {
    return request({
        url: '/auth/token/login/',
        method: 'post',
        data
    })
}

export function getMeInfo() {
    return request({
        url: '/users/',
        method: 'get'
    })
}

export function updateInfo(id:number,data:any) {
    return request({
        url: `/users/${id}/`,
        method: 'put',
        data
    })
}
export function updatepassword(data:any) {
    return request({
        url: `/password/`,
        method: 'put',
        data
    })
}

// 
