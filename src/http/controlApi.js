import { $authHost, $host } from "./index";

export const fetchOneControl= async (id)=>{
    const rez = await $host.get('control/'+id)
    return rez
}
export const fetchAllControl= async ()=>{
    const rez = await $host.get('control')
    return rez
}
export const deleteControl= async (id)=>{
    const rez = await $host.delete('control/'+id)
    return rez
}
export const addControl= async (formdata)=>{
    const response = await $host.post('control', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data', // Установите правильный Content-Type
        },
    })
    return response
}
export const patchControlFile = async (controlId, formdata)=>{
    const response =await $host.patch(`/control/patchFile/?controlId=${controlId}`, formdata)
    return response
}
export const patchControl = async (controlId, formdata)=>{
    const response =await $host.patch(`/control/patchDescription/?controlId=${controlId}`, formdata)
    return response
}