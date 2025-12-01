/// <reference types="jest" />

import { ProfileType } from "../types/types"
import profileReducer, { actions } from "./profile-reducer"

const state = {
    posts: [
        {id: 1, name: 'Rustam', message: 'Hi, how are you?', likes: 'like', likesCount: 10, avatar: null},
        {id: 2, name: 'Artem', message: 'It\'s my first post', likes: 'dislike', likesCount: 15, avatar: null},
        {id: 3, name: 'Kamol', message: "I'm driver", likes: 'like', likesCount: 20, avatar: null},
        {id: 4, name: 'Masha', message: "I'm barmen", likes: 'like', likesCount: 20, avatar: null},
        {id: 5, name: 'Dasha', message: "I'm manager", likes: 'like', likesCount: 20, avatar: null},
    ],
    profile: null as ProfileType | null,
    status: "",
}

test('length of posts should be incremented', () => {
    const action = actions.addPostActionCreator("it-kamasutra.com")
    const newState = profileReducer(state, action)
    
    expect(newState.posts.length).toBe(6)
})

test('message of new posts should be correct', () => {
    const action = actions.addPostActionCreator("it-kamasutra.com")
    const newState = profileReducer(state, action)

    expect(newState.posts[5]?.message).toBe("it-kamasutra.com")
})

test('after deleting of messages should be decrement', () => {
    const action = actions.deletePost(1)
    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
})

test(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    const action = actions.deletePost(1000)
    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(5)
})
