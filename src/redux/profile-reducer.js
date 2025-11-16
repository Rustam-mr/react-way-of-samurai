import { profileApi, usersApi } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST'

const initialState = {
    posts: [
        {id: 1, name: 'Rustam', message: 'Hi, how are you?', likes: 'like', likesCount: 10},
        {id: 2, name: 'Artem', message: 'It\'s my first post', likes: 'dislike', likesCount: 15},
        {id: 3, name: 'Kamol', message: "I'm driver", likes: 'like', likesCount: 20},
        {id: 4, name: 'Masha', message: "I'm barmen", likes: 'like', likesCount: 20},
        {id: 5, name: 'Dasha', message: "I'm manager", likes: 'like', likesCount: 20},
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST: 
            return {
                ...state,
                posts: [...state.posts, {id: 6, message: action.newPostText, likes: 'like', likesCount: 5}],
                newPostText: ''
            }

        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        case SET_STATUS:
            return {...state, status: action.status}

        case DELETE_POST:
            return {...state, posts: state.posts.filter(post => post.id !== action.postId)}

        default:

            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId})

export const getUserProfile = (userId) => async (dispatch) => {
    const data = await usersApi.getProfile(userId);
    
    dispatch(setUserProfile(data));
                
}

export const getStatus = (status) => async (dispatch) => {
    const data = await profileApi.getStatus(status);

    dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
    const data = await profileApi.updateStatus(status);

    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export default profileReducer;