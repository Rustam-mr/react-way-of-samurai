import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/api"
import { authApi } from "../api/auth-api"
import { securityApi } from "../api/security-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const InitialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean | null,
    error: null as string | null,
    captchaUrl: null as string | null
}

const authReducer = (state: InitialStateType = InitialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'samurai-network/auth/SET-USER-DATA': 
            return {
                ...state,
                ...action.payload,
            }

        case 'SN/auth/GET-ERROR-MESSAGE':
            return {
                ...state,
                error: action.payload.errorMessage
            }
        case 'SN/auth/GET-CAPTCHA-SUCCESS':
            return {
                ...state,
                captchaUrl: action.payload.captchaUrl
            }

        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: 'samurai-network/auth/SET-USER-DATA', payload: {userId, email, login, isAuth}} as const),
    getErrorMessage: (errorMessage: string | null) => ({ type: 'SN/auth/GET-ERROR-MESSAGE', payload: {errorMessage} } as const),
    getCaptchaUrlSuccess: (captchaUrl: string ) => ({ type: 'SN/auth/GET-CAPTCHA-SUCCESS', payload: {captchaUrl} } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
        const meData = await authApi.me()
        

        if (meData?.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = meData.data
            dispatch(actions.setAuthUserData(id, login, email, true))
        }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    const loginData = await authApi.login(email, password, rememberMe, captcha)

    // Добавьте эту проверку на случай, если data полностью отсутствует
    if (!loginData) {
        dispatch(actions.getErrorMessage("No response from server."))
        console.error("Login error: No data received")
        return // Останавливаем выполнение thunk
    }

    if(loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if(loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        
        const firstMessage = loginData.messages?.[0]
        const message = firstMessage ?? "Some error"

        dispatch(actions.getErrorMessage(message))
        console.error("Login error:", message)
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaData = await securityApi.getCaptchaUrl()
    
    if (captchaData !== null) {
        const captchaUrl = captchaData.url
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const logoutData = await authApi.logout()

    if(logoutData.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer

export type InitialStateType = typeof InitialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
