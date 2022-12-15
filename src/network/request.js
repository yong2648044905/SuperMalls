import axios from 'axios'
//数据的请求
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })
    //axios的拦截器
    instance.interceptors.request.use(config => {
        return config;
    }, err => {
        // console.log(err);
    })
    //axios的响应式拦截器
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err);
    })
    //发送请求
    return instance(config)
}