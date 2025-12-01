import { PhotosType, ProfileType } from "../types/types"
import { ApiResponseType, fetchData } from "./api"

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileApi = {
    getProfile(userId: number) {
        return fetchData<ProfileType>(`profile/${userId}`, 'GET')
    },
    getStatus(userId: number) {
        return fetchData<string>(`profile/status/` + userId, 'GET')
    },
    updateStatus(status: string) {
        return fetchData<ApiResponseType>(`profile/status`, 'PUT', { status: status } )
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)
        // Axios автоматически устанавливает правильный Content-Type для FormData
        return fetchData<ApiResponseType<SavePhotoResponseDataType>>(`profile/photo`, 'PUT', formData)
    },
    saveProfile(profile: ProfileType) {
        return fetchData<ApiResponseType>(`profile`, 'PUT', profile)
    }
}