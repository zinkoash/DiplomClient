import { $authHost, $host } from "./index";

export const fetchOneControl= async (id)=>{
    const rez = await $host.get('control/'+id)
    return rez
}
export const fetchAllControl= async ()=>{
    const rez = await $host.get('control')
    return rez
}