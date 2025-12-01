import { profileApi } from "../api/profile-api"
import { PhotosType, PostType, ProfileType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const initialState = {
    posts: [
        {id: 1, name: 'Russel', message: 'Hi, how are you?', likes: 'like', likesCount: 10, avatar: null},
        {id: 2, name: 'Antonio', message: 'It\'s my first post', likes: 'dislike', likesCount: 15, avatar: null},
        {id: 3, name: 'Camel', message: "I'm driver", likes: 'like', likesCount: 20, avatar: null},
        {id: 4, name: 'Maria', message: "I'm barmen", likes: 'like', likesCount: 20, avatar: null},
        {id: 5, name: 'Denis', message: "I'm manager", likes: 'like', likesCount: 20, avatar: null},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/PROFILE/ADD-POST': 
            return {
                ...state,
                posts: [...state.posts, {
                    id: 6,
                    name: state.profile?.fullName || 'Anonymous',
                    message: action.newPostText,
                    likes: 'like',
                    likesCount: 5,
                    avatar: state.profile?.photos.large ?? null
                }],
            }

        case 'SN/PROFILE/SET-USER-PROFILE':
            return {...state, profile: action.profile}

        case 'SN/PROFILE/SET-STATUS':
            return {...state, status: action.status}

        case 'SN/PROFILE/DELETE-POST':
            return {...state, posts: state.posts.filter(post => post.id !== action.postId)}

        case 'SN/PROFILE/SAVE-PHOTO-SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}

        case 'SN/PROFILE/SAVE-PROFILE-SUCCESS':
            // Если мы передаем весь объект профиля в экшен
            return {...state, profile: action.profile} 

        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: 'SN/PROFILE/ADD-POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET-USER-PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/PROFILE/SET-STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'SN/PROFILE/DELETE-POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE-PHOTO-SUCCESS', photos } as const),
    saveProfileSuccess: (profile: ProfileType) => ({ type: 'SN/PROFILE/SAVE-PROFILE-SUCCESS', profile } as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileApi.getProfile(userId)
    
    if (data !== null) {
        dispatch(actions.setUserProfile(data))
    }
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileApi.getStatus(userId)
    
    if (data !== null) {
        dispatch(actions.setStatus(data))
    }
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileApi.updateStatus(status)

    if (data !== null) {
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        } else {
            // ЭТА ошибка должна быть поймана глобальным обработчиком в App.js
            throw new Error(data.messages[0] || "Status error") 
            // Здесь нет try/catch, поэтому это "unhandled rejection"
        }
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileApi.savePhoto(file)

    if (data !== null) {
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos))
        }
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileApi.saveProfile(profile)

    if (data !== null) {
        if (data.resultCode === 0) {
            // Успех
            if (userId !== null) {
                dispatch(getUserProfile(userId))
                return Promise.resolve() // Возвращаем успешный Promise
            } else {
                const errorMessage = "UserId can't be null"
                return Promise.reject(errorMessage)
            }
        } else {
            // Ошибка сервера
            const errorMessage = data.messages.length > 0 ? data.messages[0] : "Some error"
            
            return Promise.reject(errorMessage) // Возвращаем Promise с ошибкой
        }
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>