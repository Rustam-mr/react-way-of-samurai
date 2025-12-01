import Preloader from "../../common/preloader/Preloader"
import s from "./style.module.css"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import userPhoto from "../../../assets/images/avatar.png"
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter"
import React, { ChangeEvent, useState } from "react"
import ProfileDataForm from "./ProfileDataForm"
// Импортируем типы из общего файла
import { ProfileType } from "../../../types/types"
// Импортируем UseFormSetError из react-hook-form
import { UseFormSetError } from "react-hook-form"

type SetErrorType = UseFormSetError<ProfileType>; 

type PropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string 
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void 
    saveProfile: (formData: ProfileType) => Promise<any>
}

// --- Основной компонент ProfileInfo ---
const ProfileInfo: React.FC<PropsType> = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)
    
    if(!profile) {
        return <Preloader />
    }

    // Обработчик выбора файла фотографии (FIX: access index 0 and assert non-null)
    const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            savePhoto(e.target.files![0]!); 
        }    
    }

    // Обработчик отправки данных формы профиля (FIX: added correct type for setError argument)
    const onSubmit = (dataForm: ProfileType, setError: SetErrorType) => {
        saveProfile(dataForm).then(() => {
            setEditMode(false)
        }).catch(errorMessage => { 
            
            let fieldName: string = "root" 

            if (typeof errorMessage === 'string') {
                const match = errorMessage.match(/\(([^)]+)\)/) 

                if (match && match[1]) {
                    let fullPath = match[1]

                    const parts = fullPath.split('->') 
                    // FIX: Check that parts[1] exists before calling .toLowerCase()
                    if (parts.length > 1 && parts[1] !== undefined) {
                        const contactKey = parts[1].toLowerCase() 
                        fieldName = `contacts.${contactKey}` 
                    } else {
                        fieldName = `contacts` 
                    }
                }
            }

            // Устанавливаем ошибку для конкретного поля (например, "contacts.vk")
            // Этот вызов теперь соответствует типу SetErrorType
            setError(fieldName as keyof ProfileType, { type: "server", message: errorMessage })
        })
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
                        // Аргументы onSubmit теперь совпадают по типу
                        <ProfileDataForm profile={profile} onSubmit={onSubmit} /> : 
                        <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)} } status={status} updateStatus={updateStatus} />
                    }
                </div>
                
            </div>
        </div>
    )
}

// --- Компоненты ProfileData и Contact ---

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
    status: string
    updateStatus: (status: string) => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode, status, updateStatus}) => {
    return (
        <div className={s.profileDataWrapper}>
            {isOwner && <button onClick={goToEditMode} className={s.editButton}>Редактировать</button>}
            
            <h1 className={s.fullName}>{capitalizeFirstLetter(profile.fullName)}</h1>

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
                    {/* FIX: Assert the keys type here */}
                    {(Object.keys(profile.contacts) as Array<keyof ProfileType['contacts']>).map((k)=> {
                        if (profile.contacts[k]) { 
                            return <Contact key={k} contactTitle={k} contactValue={profile.contacts[k]!} />
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    )
}

type ContactsPropsType = {
    contactTitle: string 
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contactItem}><b>{contactTitle}:</b> <a href={contactValue} target="_blank" rel="noopener noreferrer">{contactValue}</a></div>
}

export default ProfileInfo