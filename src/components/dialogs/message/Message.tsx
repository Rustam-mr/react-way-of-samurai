import React from "react"
import s from "./style.module.css"

type PropsType = {
    message: string 
    isOwn: boolean
}

const Message: React.FC<PropsType> = ({message, isOwn}) => {
    // debugger
    return (
        // Используем класс messageItem для стилизации пузыря сообщения
        <div className={isOwn ? `${s.ownMessageItem} ${s.messageItem}` : `${s.messageItem}`}>
            {message}
        </div>
    )
}

export default Message