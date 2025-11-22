import s from "./style.module.css";

const Message = ({message, isOwn}) => {
    // debugger
    return (
        // Используем класс messageItem для стилизации пузыря сообщения
        <div className={isOwn ? `${s.ownMessageItem} ${s.messageItem}` : `${s.messageItem}`}>
            {message}
        </div>
    );
}

export default Message;