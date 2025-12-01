import { NavLink } from "react-router-dom"
import s from "./style.module.css"
import React from "react"
// import defaultAvatar from './images/default-avatar.png'; // Убедитесь, что путь правильный

type PropsType = {
    id: number 
    name: string
}

const DialogItem: React.FC<PropsType> = ({id, name}) => {
    let path = "/dialogs/" + id
    
    return (
        // Используем NavLink с пропсом activeClassName для автоматического добавления класса активности
        <NavLink 
            to={path} 
            className={({ isActive }) => 
                isActive ? `${s.dialogItem} ${s.activeDialog}` : s.dialogItem
            }
        >
            {/* Имитация аватара */}
            <div className={s.dialogAvatarPlaceholder}></div>
            
            {/* Имя собеседника */}
            <div className={s.dialogName}>{name}</div>
        </NavLink>
    )
}

export default DialogItem