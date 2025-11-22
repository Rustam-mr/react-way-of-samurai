import React from 'react';
import s from "./style.module.css";
// Предполагается, что у вас есть изображение профиля по умолчанию
import defaultAvatar from '../../../../assets/images/avatar.png'; // Убедитесь, что путь к изображению правильный

const Post = (props) => {
    return (
        // Используем класс "postItem" для всего поста
        <div className={s.postItem}>
            {/* Аватар пользователя */}
            <img 
                src={props.avatar || defaultAvatar} 
                alt="Avatar" 
                className={s.avatar} 
            />
            <div className={s.postContent}>
                {/* Имя автора (если есть, иначе просто "Имя") */}
                <div className={s.authorName}>
                    {props.name || "Пользователь"}
                </div>
                
                {/* Основной текст сообщения */}
                <div className={s.postMessage}>
                    {props.message}
                </div>

                {/* Блок с лайками и счетчиком */}
                <div className={s.postFooter}>
                    <span className={s.likes}>
                        {props.likes} 
                    </span>
                    <span className={s.likesCount}>
                        {props.likesCount || 0} лайков
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Post;