import { useForm, UseFormSetError } from "react-hook-form"
import { Input, Textarea } from "../../common/formsControls/FormsControl"
// Импортируем стили
import s from "./style.module.css"
import { ProfileType } from "../../../types/types"
import React from "react"

type SetErrorType = UseFormSetError<ProfileType>

type PropsType = {
    profile: ProfileType 
    onSubmit: (formData: ProfileType, setError: SetErrorType) => void
}

const ProfileDataForm: React.FC<PropsType> = ({profile, onSubmit}) => {
    const {register, handleSubmit, formState: {errors}, setError } = useForm<ProfileType>({
        mode: "onTouched",
        defaultValues: {
            fullName: profile.fullName || '',
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription || '',
            aboutMe: profile.aboutMe || '',
            contacts: profile.contacts
        },
    })

    // Передаем setError в handleSubmit для использования в родительском компоненте ProfileInfo
    const handleFormSubmit = (data: ProfileType) => {
        onSubmit(data, setError) 
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={s.profileForm}>
            {/* Пример отображения ошибок валидации и серверных ошибок */}
            <div className={s.formItem}>
                <b className={s.formLabel}>Полное имя:</b> 
                <Input {...register("fullName")} placeholder={"Fullname"} className={s.formControl} error={errors.fullName} />
            </div>
            {/* ... другие поля аналогично ... */}
            <div className={s.formItem}>
                 <b className={s.formLabel}>Looking for a job:</b> <Input {...register("lookingForAJob")} type={"checkbox"} className={s.formCheckbox} error={errors.lookingForAJob} />
             </div>
             <div className={s.formItem}>
                 <b className={s.formLabel}>My professional skills:</b> <Textarea {...register("lookingForAJobDescription")} className={s.formControl} placeholder={"My professional skills"} />
             </div>
             <div className={s.formItem}>
                 <b className={s.formLabel}>About me:</b> <Textarea {...register("aboutMe")} className={s.formControl} />
             </div>

            {/* Добавление полей контактов динамически */}
            {/* Добавление полей контактов динамически */}
            {/* FIX 1: Assert that Object.keys returns keys of the contacts type */}
            {(Object.keys(profile.contacts) as Array<keyof ProfileType['contacts']>).map(key => (
                <div key={key} className={s.formItem}>
                    <b className={s.formLabel}>{key}:</b>
                    
                    {/* FIX 2: Use 'as const' to tell TS that the resulting path is a specific string literal */}
                    <Input 
                        {...register(`contacts.${key}` as const)} 
                        placeholder={key} 
                        className={s.formControl} 
                        error={errors.contacts?.[key]}
                    />
                </div>
            ))}

            <div><button className={s.saveButton}>Сохранить</button></div>
        </form>
    )
}

export default ProfileDataForm