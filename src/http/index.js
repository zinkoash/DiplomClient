import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const $host = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL:process.env.REACT_APP_API_URL

})

const authInterceptor = config => {
    const _token = cookies.get('_token')
    config.headers.authorization = `Bearer ${_token}`
    return config;
}


$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}