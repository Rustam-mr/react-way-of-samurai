import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'SET-INITIALIZED';

const initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const initialedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initialedSuccess());
    })
}