import { NavLink } from "react-router-dom"
import s from './style.module.css'
import userPhoto from '../../assets/images/avatar.png' // Используйте правильный путь к изображению по умолчанию
import { UserType } from "../../types/types"
import React from "react"

type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

const User: React.FC<PropsType> = ({user, follow, unfollow, followingInProgress}) => {
    return (
        // Главный контейнер для карточки пользователя
        <div className={s.userItem}>
            <div className={s.userInfoWrapper}>
                
                {/* Левая часть: Аватар и кнопки подписки */}
                <div className={s.avatarColumn}>
                    <div className={s.avatarContainer}>
                        <NavLink to={'/profile/' + user.id}>
                            {/* Используем userPhoto как заглушку, если фото нет */}
                            <img 
                                className={s.userAvatar} 
                                src={user.photos.small != null ? user.photos.small : userPhoto } 
                                alt="User Avatar" 
                            />
                        </NavLink>
                    </div>
                    <div className={s.followButtonContainer}>
                        {user.followed
                        ? <button 
                            className={s.unfollowButton} 
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { 
                                unfollow(user.id)
                        }}>Отписаться</button>
                        : <button 
                            className={s.followButton} 
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { 
                                follow(user.id)
                        }}>Подписаться</button>
                        }
                    </div>
                </div>

                {/* Правая часть: Имя, статус, локация */}
                <div className={s.detailsColumn}>
                    <div className={s.nameAndStatus}>
                        <div className={s.userName}>{user.name}</div>
                        {/* VK использует серый цвет для статуса, даже если его нет */}
                        <div className={s.userStatus}>
                            {user.status ? user.status : "Статус отсутствует"}
                        </div>
                    </div>
                    
                    <div className={s.location}>
                        {/* Эти данные недоступны в текущих пропсах, это заглушки */}
                        <div className={s.locationItem}>{"Страна: (нет данных)"}</div>
                        <div className={s.locationItem}>{"Город: (нет данных)"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User