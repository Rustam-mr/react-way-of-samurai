import { ApiResponseType, fetchData, ResultCodeForCaptchaEnum, ResultCodesEnum } from "./api"

type MeResponseDataType = {
    id: number 
    email: string 
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authApi = {
    me() {
        return fetchData<ApiResponseType<MeResponseDataType>>(`auth/me`, 'GET')
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return fetchData<ApiResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, 'POST', { email, password, rememberMe, captcha})
    },
    logout() {
        return fetchData(`auth/login`, 'DELETE')
    }
}