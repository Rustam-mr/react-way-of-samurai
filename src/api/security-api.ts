import { fetchData } from "./api"

type GetCaptchaUrlType = {
    url: string
}

export const securityApi = {
    getCaptchaUrl() {
        return fetchData<GetCaptchaUrlType>(`/security/get-captcha-url`, 'GET')
    }
}
