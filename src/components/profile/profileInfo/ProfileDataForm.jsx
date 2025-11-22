import { useForm } from "react-hook-form";
import { Input, Textarea } from "../../common/formsControls/FormsControl";
// Импортируем стили
import s from "./style.module.css"; 

const ProfileDataForm = ({profile, onSubmit}) => {
    const contacts = profile.contacts || {};    // Получаем setError и watch для отслеживания изменений (если нужно)
    const {register, handleSubmit, formState: {errors}, setError } = useForm({
        mode: "onTouched",
        defaultValues: {
            fullName: profile.fullName || '',
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription || '',
            aboutMe: profile.aboutMe || '',
            contacts: {
                facebook: contacts.facebook || '',
                website: contacts.website || '',
                vk: contacts.vk || '',
                twitter: contacts.twitter || '',
                instagram: contacts.instagram || '',
                youtube: contacts.youtube || '',
                github: contacts.github || '',
                mainLink: contacts.mainLink || '',
            }
        },
    });

    // Передаем setError в handleSubmit для использования в родительском компоненте ProfileInfo
    const handleFormSubmit = (data) => {
        onSubmit(data, setError); 
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={s.profileForm}>
            {/* Пример отображения ошибок валидации и серверных ошибок */}
            <div className={s.formItem}>
                <b className={s.formLabel}>Полное имя:</b> 
                <Input {...register("fullName")} placeholder={"Fullname"} className={s.formControl} error={errors.fullName} />
            </div>
            {/* ... другие поля аналогично ... */}
            <div className={s.formItem}>
                 <b className={s.formLabel}>Looking for a job:</b> <Input {...register("lookingForAJob")} type={"checkbox"} className={s.formCheckbox} error={errors.job} />
             </div>
             <div className={s.formItem}>
                 <b className={s.formLabel}>My professional skills:</b> <Textarea {...register("lookingForAJobDescription")} className={s.formControl} placeholder={"My professional skills"} />
             </div>
             <div className={s.formItem}>
                 <b className={s.formLabel}>About me:</b> <Textarea {...register("aboutMe")} className={s.formControl} />
             </div>

            {/* Добавление полей контактов динамически */}
            {Object.keys(profile.contacts).map(key => (
                <div key={key} className={s.formItem}>
                    <b className={s.formLabel}>{key}:</b>
                    {/* Передаем ошибку для конкретного контакта: errors.contacts?.key */}
                    <Input 
                        {...register(`contacts.${key}`)} 
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

export default ProfileDataForm;