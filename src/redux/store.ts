import { ProfileType } from "../types/types"
import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"
import sidebarReducer from "./sidebar-reducer"

type PostType = {
    id: number 
    name: string 
    message: string 
    likes: string
    likesCount: number
    avatar: string | null
}

type ProfilePageType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string 
}

type DialogType = {
    id: number 
    name: string
}

type MessageType = {
    id: number 
    senderId: number
    message: string
}

type DialogsPageType  = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

type SidebarType = {}

type AppStateType = {
    profilePage: ProfilePageType 
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

type ObserverType = (state: AppStateType) => void
type ActionType = any

interface StoreType {
    _state: AppStateType
    _callSubscriber: ObserverType
    getState: () => AppStateType
    subscribe: (observer: ObserverType) => void
    dispatch: (action: ActionType) => void
}

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, name: 'Rustam', message: 'Hi, how are you?', likes: 'like', likesCount: 10, avatar: 'url_to_avatar_1'},
                {id: 2, name: 'Artem', message: 'It\'s my first post', likes: 'dislike', likesCount: 15, avatar: 'url_to_avatar_2'},
                {id: 3, name: 'Kamol', message: "I'm driver", likes: 'like', likesCount: 20, avatar: 'url_to_avatar_1'},
                {id: 4, name: 'Masha', message: "I'm barmen", likes: 'like', likesCount: 20, avatar: 'url_to_avatar_2'},
                {id: 5, name: 'Dasha', message: "I'm manager", likes: 'like', likesCount: 20, avatar: 'url_to_avatar_1'},
            ],
            profile: null,
            status: 'it-kamsutra.com'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sasha'},
                {id: 4, name: 'Misha'},
                {id: 5, name: 'Maksim'},
                {id: 6, name: 'Egor'}
            ],
            messages: [
                {id: 1, senderId: 32658, message: 'Hi'},
                {id: 2, senderId: 32658, message: 'How are you?'},
                {id: 3, senderId: 32658, message: 'Nice'},
                {id: 4, senderId: 32658, message: 'Good'},
                {id: 5, senderId: 32658, message: 'Bye'},
                {id: 6, senderId: 32658, message: 'Nice too meet you'},
            ],
        },
        sidebar: {}
    },
    _callSubscriber: function(state: AppStateType) {
        console.log('State changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer: ObserverType) {
        this._callSubscriber = observer
    },
    dispatch(action: ActionType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        
        this._callSubscriber(this._state)
    }
}

export default store
