import { InferActionsTypes } from "./redux-store"

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    senderId: number
    message: string
}

const initialState = {
    dialogs: [
        {id: 1, name: 'Dmitri'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Mica'},
        {id: 5, name: 'Make'},
        {id: 6, name: 'Edgar'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, senderId: 1, message: 'Hi'},
        {id: 2, senderId: 1, message: 'How are you?'},
        {id: 3, senderId: 32658, message: 'Nice'},
        {id: 4, senderId: 32658, message: 'Good'},
        {id: 5, senderId: 3, message: 'Bye'},
        {id: 6, senderId: 32658, message: 'Nice too meet you'},
    ] as Array<MessageType>
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE': 
            const body = action.newMessageBody

            return {
                ...state,
                messages: [...state.messages, {id: 7, senderId: 32658, message: body}]
            }
        default:

            return state
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody} as const)
} 

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

