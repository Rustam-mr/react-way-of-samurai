import React from 'react'; 
import { useForm } from 'react-hook-form'; 
import { Textarea } from "../../common/formsControls/FormsControl";
import s from './style.module.css'; 

const AddMessageForm = ({ onSubmit }) => {
    // Деструктурируем register для использования с forwardRef в Textarea
    // Нам все еще нужны errors и touchedFields для логики отключения кнопки, 
    // даже если мы не показываем их на экране
    const { register, handleSubmit, formState: { isValid, touchedFields } } = useForm({
        mode: 'onChange' // Валидация при каждом изменении, чтобы isValid обновлялся
    });

    const { ref: newMessageBodyRef, ...newMessageBodyRest } = register("newMessageBody", { 
        required: true, // Сообщение об ошибке не нужно, но правило оставляем
        minLength: {
            value: 1,
            message: "Сообщение не может быть пустым" // Сообщение оставляем, оно используется в isValid
        },
        maxLength: {
            value: 20, 
            message: "Максимальная длина 20 символов" 
        }
    });

    return (
        // Класс добавлен: s.addMessageForm
        <form onSubmit={handleSubmit(onSubmit)} className={s.addMessageForm}>
            {/* Класс добавлен: s.formControl */}
            <div className={s.formControl}>
                <Textarea 
                    {...newMessageBodyRest}
                    ref={newMessageBodyRef}
                    placeholder={"Введите ваше сообщение"} 
                    // Класс добавлен: s.messageTextarea
                    className={s.messageTextarea}
                />
                {/* Элемент ошибки был удален по вашему запросу */}
            </div>
            {/* Класс добавлен: s.sendButtonContainer */}
            <div className={s.sendButtonContainer}>
                {/* 
                    Кнопка отключена, если форма невалидна (!isValid) 
                    ИЛИ если поле еще не было затронуто пользователем (!touchedFields.newMessageBody)
                */}
                <button 
                    type="submit" 
                    // Класс добавлен: s.sendButton
                    className={s.sendButton} 
                    disabled={!isValid || !touchedFields.newMessageBody}
                >
                    Отправить
                </button>
            </div>
        </form>
    );
};

export default AddMessageForm;
