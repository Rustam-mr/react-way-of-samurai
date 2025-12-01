import { getAuthUserData } from "./auth-reducer"
import { InferActionsTypes } from "./redux-store"

const initialState = {
    initialized: false,
    globalError: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/APP/SET-INITIALIZED':
            return {
                ...state,
                initialized: true
            }

        case 'SN/APP/SET-GLOBAL-ERROR':
            return {
                ...state,
                globalError: action.error
            }

        case 'SN/APP/CLEAR-GLOBAL-ERROR':
            return {
                ...state,
                globalError: null
            }

        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    initialedSuccess: () => ({ type: 'SN/APP/SET-INITIALIZED' } as const),
    setGlobalError: (error: string | null) => ({ type: 'SN/APP/SET-GLOBAL-ERROR', error }  as const),
    clearGlobalError: () => ({ type: 'SN/APP/CLEAR-GLOBAL-ERROR' } as const)
}


export const initializeApp = () => async (dispatch: any) => {
    const promise = dispatch(getAuthUserData())
    await Promise.all([promise]).then(() => {
        dispatch(actions.initialedSuccess())
    })
}

export const setAppGlobalError = (error: string | null) => async (dispatch: any) => {
    dispatch(actions.setGlobalError(error))
}