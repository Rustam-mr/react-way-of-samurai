import axios from 'axios'
import { UserType } from '../types/types'

const BASE_URL = 'https://social-network.samuraijs.com/api/1.0/'
const API_KEY = "7f3fa617-efc9-40ea-a434-108ef2b1473b"

// 1. Создаем экземпляр Axios с настройками по умолчанию
const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Заменяет credentials: 'include'
    headers: {
        "API-KEY": API_KEY,
        // Content-Type: application/json добавляется Axios автоматически
    }
})

// 2. Универсальная функция запроса (упрощена благодаря Axios)
export const fetchData = async <T = any>(url: string, method: string = 'GET', data?: any): Promise<T | null> => {
    try {
        let response: any

        switch (method.toLowerCase()) {
            case 'get':
                response = await instance.get(url)
                break
            case 'post':
                response = await instance.post(url, data)
                break
            case 'put':
                response = await instance.put(url, data)
                break
            case 'delete':
                response = await instance.delete(url)
                break
            default:
                throw new Error(`Unsupported method: ${method}`)
        }
        
        // Axios всегда возвращает response.data (тело ответа)
        return response.data;

    } catch (error) {
        console.error("Axios fetch error:", error)
        // В случае сетевой ошибки или ошибки HTTP, можно вернуть null
        return null
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number 
    error: string | null
}

export type ApiResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}





