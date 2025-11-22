import { profileApi, usersApi } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';
const SAVE_PROFILE_SUCCESS = 'SAVE-PROFILE-SUCCESS';

const initialState = {
    posts: [
        {id: 1, name: 'Russel', message: 'Hi, how are you?', likes: 'like', likesCount: 10, avatar: null},
        {id: 2, name: 'Antonio', message: 'It\'s my first post', likes: 'dislike', likesCount: 15, avatar: null},
        {id: 3, name: 'Camel', message: "I'm driver", likes: 'like', likesCount: 20, avatar: null},
        {id: 4, name: 'Maria', message: "I'm barmen", likes: 'like', likesCount: 20, avatar: null},
        {id: 5, name: 'Denis', message: "I'm manager", likes: 'like', likesCount: 20, avatar: null},
    ],
    profile: null,
    status: "",
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST: 
        debugger
            return {
                ...state,
                posts: [...state.posts, {
                    id: 6,
                    name: state.profile?.fullName || 'Anonymous',
                    message: action.newPostText,
                    likes: 'like',
                    likesCount: 5,
                    avatar: state.profile?.photos.large
                }],
            }

        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        case SET_STATUS:
            return {...state, status: action.status}

        case DELETE_POST:
            return {...state, posts: state.posts.filter(post => post.id !== action.postId)}

        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}}

        case SAVE_PROFILE_SUCCESS:
            // Если мы передаем весь объект профиля в экшене
            return {...state, profile: action.profile} 

        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });
export const saveProfileSuccess = (profile) => ({ type: SAVE_PROFILE_SUCCESS, profile });

export const getUserProfile = (userId) => async (dispatch) => {
    const data = await usersApi.getProfile(userId);
    
    dispatch(setUserProfile(data));
}

export const getStatus = (status) => async (dispatch) => {
    const data = await profileApi.getStatus(status);
debugger
    dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
        const data = await profileApi.updateStatus(status);

    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    } else {
        // ЭТА ошибка должна быть поймана глобальным обработчиком в App.js
        throw new Error(data.messages[0] || "Status error"); 
        // Здесь нет try/catch, поэтому это "unhandled rejection"
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const data = await profileApi.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileApi.saveProfile(profile);

    if (data.resultCode === 0) {
        // Успех
        dispatch(getUserProfile(userId));
        return Promise.resolve(); // Возвращаем успешный Promise
    } else {
        // Ошибка сервера
        const errorMessage = data.messages.length > 0 ? data.messages[0] : "Some error";
        
        return Promise.reject(errorMessage); // Возвращаем Promise с ошибкой
    }
}

export default profileReducer;