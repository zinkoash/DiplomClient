import { $authHost, $host } from "./index";

export const fetchOneTheory= async (id)=>{
    const rez = await $host.get('theory/'+id)
    return rez
}
export const fetchAllTheory= async ()=>{
    const rez = await $host.get('theory')
    return rez
}
export const deleteTheory= async (id)=>{
    const rez = await $host.delete('theory/'+id)
    return rez
}
export const addTheory= async (formdata)=>{
    const response = await $host.post('theory/', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data', // Установите правильный Content-Type
        },
    })
    return response
}
export const patchTheory = async (theoryId, formdata)=>{
    const response =await $host.patch(`/theory/patchDescription/?theoryId=${theoryId}`, {...formdata, number:Number(formdata.number)})
    return response
}
export const patchTheoryFile = async (theoryId, formdata)=>{
    const response =await $host.patch(`/theory/patchFile/?theoryId=${theoryId}`, formdata)
    return response
}