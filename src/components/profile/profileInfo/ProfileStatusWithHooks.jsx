import { useEffect, useState } from "react";
import s from "./style.module.css";

const ProfileStatusWithHooks = ({status, updateStatus, isOwner}) => {
    const [editMode, setEditMode] = useState(false);
    const [stateStatus, setStateStatus] = useState(status)

    useEffect(() => {
        setStateStatus(status)
    }, [status])

    const activateMode = () => {
        if (isOwner) {
            setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(stateStatus)
    }

    const onStatusChange = (e) => {
        setStateStatus(e.currentTarget.value)
    }

    return (
        <div className={s.statusBlock}> {/* Общий контейнер для статуса */}
            {!editMode &&
            <div className={s.statusWrapper}>
                {/* Убираем жирный текст "Status:", просто выводим статус */}
                <span 
                    onDoubleClick={activateMode} 
                    // Используем классы для курсора/стиля при возможности редактирования
                    className={`${s.statusText} ${isOwner ? s.isOwner : ''}`}
                >
                    {status || "Установить статус"}
                </span>
            </div>
            }
            {editMode && isOwner &&
            <div className={s.inputWrapper}>
                <input 
                    className={s.statusInput} 
                    onBlur={deactivateEditMode} 
                    onChange={onStatusChange} 
                    value={stateStatus} 
                    autoFocus={true}  
                    placeholder="Введите ваш статус"
                />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;