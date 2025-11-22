const SEND_MESSAGE = 'SEND-MESSAGE';

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Misha'},
        {id: 5, name: 'Maksim'},
        {id: 6, name: 'Egor'}
    ],
    messages: [
        {id: 1, senderId: 1, message: 'Hi'},
        {id: 2, senderId: 1, message: 'How are you?'},
        {id: 3, senderId: 32658, message: 'Nice'},
        {id: 4, senderId: 32658, message: 'Good'},
        {id: 5, senderId: 3, message: 'Bye'},
        {id: 6, senderId: 32658, message: 'Nice too meet you'},
    ]
}

const dialogsReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case SEND_MESSAGE: 
            const body = action.newMessageBody;

            return {
                ...state,
                messages: [...state.messages, {id: 7, message: body}]
            }
        default:

            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;