import request from '@/utils/request'
interface signupParams {
    file_name:String
}
export function getFiles(data: signupParams) {
    return request({
        url: '/files/',
        method: 'get',
        params:data
    })
}
export function PostCode (data:any){
    return request({
        url:'/codes/',
        method:'post',
        data
    })
}

