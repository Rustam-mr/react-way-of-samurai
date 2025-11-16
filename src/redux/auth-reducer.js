// import { stopSubmit } from "redux-form";
import { authApi } from "../api/api";

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth}});

export const getAuthUserData = () => async (dispatch) => {
        const data = await authApi.me();

        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(setAuthUserData(id, login, email, true));
        }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
        const data = await authApi.login(email, password, rememberMe);

        if(data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            const messages = data.messages.length > 0 ? data.messages[0] : "Some error";
            // dispatch(stopSubmit('login', {_error: messages}));
            console.error("Login error:", messages);
        }
}

export const logout = () => async (dispatch) => {
    const data = await authApi.logout();

    if(data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;