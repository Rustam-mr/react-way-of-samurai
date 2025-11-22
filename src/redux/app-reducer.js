import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'SET-INITIALIZED';
const SET_GLOBAL_ERROR = 'SET-GLOBAL-ERROR';
const CLEAR_GLOBAL_ERROR = 'CLEAR-GLOBAL-ERROR';

const initialState = {
    initialized: false,
    globalError: null
}

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        case SET_GLOBAL_ERROR:
            return {
                ...state,
                globalError: action.error
            }

        case CLEAR_GLOBAL_ERROR:
            return {
                ...state,
                globalError: null
            }

        default:
            return state;
    }
}

export const initialedSuccess = () => ({ type: INITIALIZED_SUCCESS });
export const setGlobalError = (error) => ({ type: SET_GLOBAL_ERROR, error});
export const clearGlobalError = () => ({ type: CLEAR_GLOBAL_ERROR });

export const initializeApp = () => (dispatch) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initialedSuccess());
    })
}

export const getGlobalError = (error) => async (dispatch) => {
    dispatch(setGlobalError(error))
}