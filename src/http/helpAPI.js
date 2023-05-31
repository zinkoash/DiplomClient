import { $authHost, $host } from "./index";

export const fetchOneHelp= async (id)=>{
    const rez = await $host.get('help/'+id)
    return rez
}
export const fetchAllHelp= async ()=>{
    const rez = await $host.get('help')
    return rez
}
export const deleteHelp= async (id)=>{
    const rez = await $host.delete('help/'+id)
    return rez
}
export const addHelp= async (formdata)=>{
    const response = await $host.post('help', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data', // Установите правильный Content-Type
        },
    })
    return response
}
export const patchHelpFile = async (helpId, formdata)=>{
    const response =await $host.patch(`/help/patchFile/?helpId=${helpId}`, formdata)
    return response
}
export const patchHelp = async (helpId, formdata)=>{
    const response =await $host.patch(`/help/patchDescription/?helpId=${helpId}`, formdata)
    return response
}