import { authApi, securityApi } from "../api/api";

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA';
const GET_ERROR_MESSAGE = 'samurai-network/auth/GET-ERROR-MESSAGE';
const GET_CAPTCHA_URL  = 'samurai-network/auth/GET-CAPTCHA-SUCCESS';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: null,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.payload,
            }

        case GET_ERROR_MESSAGE:
            return {
                ...state,
                error: action.payload
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.payload
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth}});
export const getErrorMessage = (errorMessage) => ({ type: GET_ERROR_MESSAGE, payload: errorMessage });
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL, payload: captchaUrl });

export const getAuthUserData = () => async (dispatch) => {
        const data = await authApi.me();

        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(setAuthUserData(id, login, email, true));
        }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
        const data = await authApi.login(email, password, rememberMe, captcha);

        if(data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if(data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            const messages = data.messages.length > 0 ? data.messages[0] : "Some error";

            dispatch(getErrorMessage(messages));
            console.error("Login error:", messages);
        }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const data = await securityApi.getCaptchaUrl();
    const captchaUrl = data.url;
    
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    const data = await authApi.logout();

    if(data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;