import s from "./../style.module.css";

const Message = ({message}) => {
    
    return (
        <div className={s.dialog}>{message}</div>
    );
}

export default Message;