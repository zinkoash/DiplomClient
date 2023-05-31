import { $authHost, $host } from "./index";

export const registration = async (profile)=>{
    const response  = await $host.post('auth/registration', profile)
    return response.data
}
export const login = async (user)=>{
    const response  = await $host.post('auth/login', user)
    return response.data
}
export const check = async ()=>{
    const response  = await $authHost.get('users/me')
    return response.data
}