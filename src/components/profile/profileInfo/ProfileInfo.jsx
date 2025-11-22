import Preloader from "../../common/preloader/Preloader";
import s from "./style.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/avatar.png"
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)
    
    if(!profile) {
        return <Preloader />
    }
    // ... onMainPhotoSelector и onSubmit ...
    const onMainPhotoSelector = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }    
    }

    const onSubmit = (dataForm, setError) => {
        saveProfile(dataForm).then(() => {
            setEditMode(false);
        }).catch(errorMessage => { // errorMessage = "Invalid url format (Contacts->Vk)"
            
            let fieldName = "root"; // По умолчанию считаем ошибку общей

            if (typeof errorMessage === 'string') {
                // Используем регулярное выражение для поиска текста внутри скобок
                const match = errorMessage.match(/\(([^)]+)\)/); 

                if (match && match[1]) {
                    // match[1] содержит "Contacts->Vk"
                    let fullPath = match[1];

                    // Преобразуем "Contacts->Vk" в формат "contacts.vk" для react-hook-form
                    // 1. Делим строку по "->"
                    const parts = fullPath.split('->'); 
                    // 2. Приводим обе части к нижнему регистру
                    const contactKey = parts[1].toLowerCase(); 
                    // 3. Формируем финальное имя поля
                    fieldName = `contacts.${contactKey}`; 
                }
            }

            // Устанавливаем ошибку для конкретного поля (например, "contacts.vk")
            setError(fieldName, { type: "server", message: errorMessage });
        });
    }

    return (
        <div className={s.vkProfileWrapper}> {/* Обертка в стиле ВК */}
            <div className={s.descriptionBlock}>
                
                {/* Левая колонка: фото */}
                <div className={s.photoContainer}> 
                    <img className={s.mainPhoto} src={profile.photos.large || userPhoto} alt='avatar' />
                    {isOwner && 
                        <label htmlFor="file-upload" className={s.fileUploadButton}>
                            Изменить фото
                        </label>
                    }
                    {isOwner && 
                        <input 
                            id="file-upload" 
                            type={"file"} 
                            onChange={onMainPhotoSelector} 
                            className={s.fileInput}
                        />
                    }
                </div>

                {/* Правая колонка: данные профиля и статус */}
                <div className={s.infoColumn}>
                    {
                        editMode ? 
                        <ProfileDataForm profile={profile} onSubmit={onSubmit} /> : 
                        <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)} } status={status} updateStatus={updateStatus} />
                    }
                </div>
                
            </div>
        </div>
    );
}

// Передаем статус и updateStatus в ProfileData для стилизации
const ProfileData = ({profile, isOwner, goToEditMode, status, updateStatus}) => {
    return (
        <div className={s.profileDataWrapper}>
            {/* Кнопка EDIT теперь находится внутри ProfileData */}
            {isOwner && <button onClick={goToEditMode} className={s.editButton}>Редактировать</button>}
            
            <h1 className={s.fullName}>{capitalizeFirstLetter(profile.fullName)}</h1>

            {/* Статус под именем, как в ВК */}
            <div className={s.statusBlock}>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner} />
            </div>

            <div className={s.detailsBlock}>
                <div className={s.detailItem}>
                    <b>Обо мне:</b> {profile.aboutMe || 'Информация отсутствует'}
                </div>
                <div className={s.detailItem}>
                    <b>Ищу работу:</b> {profile.lookingForAJob ? "Да" : "Нет"}
                </div>
                {
                    profile.lookingForAJob &&
                    <div className={s.detailItem}>
                        <b>Мои навыки:</b> {profile.lookingForAJobDescription || "Не указаны"}
                    </div>
                }
                
                <div className={s.contactsBlock}>
                    <b>Контакты:</b> 
                    {Object.keys(profile.contacts).map((k)=> {
                        if (profile.contacts[k]) { // Показываем только заполненные контакты
                            return <Contact key={k} contactTitle={k} contactValue={profile.contacts[k]} />
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contactItem}><b>{contactTitle}:</b> <a href={contactValue} target="_blank" rel="noopener noreferrer">{contactValue}</a></div>
}
export default ProfileInfo;