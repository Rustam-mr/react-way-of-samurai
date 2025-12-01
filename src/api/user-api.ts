import {  ApiResponseType, fetchData, GetItemsType } from "./api"

export const usersApi = {
    getUsers (currentPage = 1, pageSize = 10) {
        return fetchData<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`, 'GET')
    },
    follow (userId: number) {
        return fetchData<ApiResponseType>(`follow/${userId}`, 'POST', {})
    },
    unfollow (userId: number) {
        return fetchData(`follow/${userId}`, 'DELETE') as Promise<ResponseType>
    }
}