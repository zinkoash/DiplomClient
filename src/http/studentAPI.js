import { $authHost, $host } from "./index";

export const getStudentByUserId = async (userId)=>{
    const response  = await $host.get(`students/getStudent/?userId=${userId}`)
    return response
}
export const getStudents = async ()=>{
    const response  = await $host.get(`students/`)
    return response
}
export const patchResultStatus = async (userId, practiceId, formdata) => {
    const response = await $host.patch(`/students/results/status/?practiceId=${practiceId}&userId=${userId}`, formdata)
    return response
}
export const sendResultWithOutFile = async (formdata) => {
    const response = await $host.post('students/addResultWithoutFile', formdata)
    return response
}