import axios from 'axios'
import {Notify} from 'vant';

function errorCreate(msg) {
    const error = new Error(msg)
    errorLog(error)
    throw error
}

function errorLog(error) {
    Notify({
        message: error.message,
        duration: 5 * 1000,
        background: 'red'
    });
}

const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const dataAxios = response.data
        const {code} = dataAxios
        if (code === undefined) {
            return dataAxios
        } else {
            switch (code) {
                case 200:
                    return dataAxios.data
                default:
                    errorCreate(`${dataAxios.message}: ${response.config.url}`)
                    break
            }
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break
                case 401:
                    error.message = '未授权，请登录';
                    window.location.href = "/api/wx/auth_url?state=" + window.location.href;
                    break
                case 403:
                    error.message = '拒绝访问';
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break
                case 408:
                    error.message = '请求超时';
                    break
                case 500:
                    error.message = '服务器内部错误';
                    break
                case 501:
                    error.message = '服务未实现';
                    break
                case 502:
                    error.message = '网关错误';
                    break
                case 503:
                    error.message = '服务不可用';
                    break
                case 504:
                    error.message = '网关超时';
                    break
                case 505:
                    error.message = 'HTTP版本不受支持';
                    break
                default:
                    break
            }
        }
        return Promise.reject(error)
    }
)

export default service
