import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, name: 'Rustam', message: 'Hi, how are you?', likes: 'like', likesCount: 10},
                {id: 2, name: 'Artem', message: 'It\'s my first post', likes: 'dislike', likesCount: 15},
                {id: 3, name: 'Kamol', message: "I'm driver", likes: 'like', likesCount: 20},
                {id: 4, name: 'Masha', message: "I'm barmen", likes: 'like', likesCount: 20},
                {id: 5, name: 'Dasha', message: "I'm manager", likes: 'like', likesCount: 20},
            ],
            newPostText: 'it-kamsutra.com'
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
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'Nice'},
                {id: 4, message: 'Good'},
                {id: 5, message: 'Bye'},
                {id: 6, message: 'Nice too meet you'},
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        
        this._callSubscriber(this._state)
    }
}

export default store;
