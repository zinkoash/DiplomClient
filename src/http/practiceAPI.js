import { $authHost, $host } from "./index";

export const fetchOnePractice = async (number) => {
    const rez = await $host.get('practice/' + number)
    return rez
}
export const fetchAllPractice = async () => {
    const rez = await $host.get('practice')
    return rez
}
export const sendResult = async (formdata) => {
    const response = await $host.post('students/addRes', formdata)
    return response
}
export const addPractice = async (formdata) => {
    const response = await $host.post('practice/', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data', // Установите правильный Content-Type
        },
    })
    return response
}
export const fetchResultByUserForPractice = async (userId, practiceNum) => {
    const response = await $host.get(`/students/results/?practiceNumber=${practiceNum}&userId=${userId}`)
    return response
}
export const fetchResultByUser = async (userId) => {
    const response = await $host.get(`/students/Allresults/?&userId=${userId}`)
    return response
}
export const patchResFile = async (userId, practiceNum, formdata) => {
    const response = await $host.patch(`/students/results/?practiceNumber=${practiceNum}&userId=${userId}`, formdata)
    return response
}
export const addVariantFile = async (formdata) => {
    const response = await $host.post(`/practice/addVariantFiles/`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data', // Установите правильный Content-Type
        },
    })
    return response
}
export const deletePractice = async (id) => {
    const rez = await $host.delete('practice/' + id)
    return rez
}