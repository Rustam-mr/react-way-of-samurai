// Login.jsx или где у вас находится этот компонент
import commonStyles from "../common/formsControls/style.module.css" // Переименовал импорт для ясности
import { GetStringKeys, Input } from "../common/formsControls/FormsControl"
import { connect } from "react-redux"
import { login } from "../../redux/auth-reducer"
import { Navigate } from "react-router-dom"
import { useForm } from "react-hook-form" 
import loginStyles from "./style.module.css" // Импортируем новые стили
import { AppStateType } from "../../redux/redux-store"
import React from "react"

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean 
    captcha: string
}

interface LoginFormProps {
    onSubmit: (formData: LoginFormValuesType) => void
    error: string | null
    captchaUrl: string | null
}

type LoginFormValuesKeysType = GetStringKeys<LoginFormValuesType>

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error, captchaUrl }) => {
    // ... логика useForm остается прежней
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValuesType>({
        mode: "onTouched"
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={loginStyles.formContainer}> {/* Добавили класс */}
            <div className={loginStyles.inputGroup}> {/* Добавили класс */}
                <Input 
                    {...register<LoginFormValuesKeysType>("email", { 
                        required: "Email field is required", 
                        maxLength: { value: 30, message: "Max length is 30 symbols" } 
                    })} 
                    type="email" 
                    placeholder="Email"
                    error={errors.email}
                />
            </div>

            <div className={loginStyles.inputGroup}> {/* Добавили класс */}
                 <Input 
                    {...register<LoginFormValuesKeysType>("password", { 
                        required: "Password field is required",
                        maxLength: { value: 30, message: "Max length is 30 symbols" } 
                    })} 
                    type="password" 
                    placeholder="Password"
                    error={errors.password}
                />
            </div>

            
            <div className={commonStyles.checkbox}>
                <Input {...register<LoginFormValuesKeysType>("rememberMe")} type="checkbox" />
                <span>remember me</span>
            </div>

            {captchaUrl && <img src={captchaUrl} alt={"Captcha"} />}
            {captchaUrl && <div className={loginStyles.inputGroup}><Input {...register<LoginFormValuesKeysType>("captcha", {
                required: "Captcha field is required",
                minLength: {value: 1, message: "Min length is 1 symbols"}
            })} type="text" error={errors.captcha} /></div>}
                    
            {error &&
                <div className={commonStyles.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button type="submit" className={loginStyles.submitButton}>Login</button> {/* Добавили класс */}
            </div>
        </form>
    );
}

// ... остальной код компонентов Login и mapStateToProps остается прежним ...

type MapStatePropsType = {
    isAuth: boolean | null
    error: string | null
    captchaUrl: string | null
}
type MapDispatchToProps = {
    login: ( email: string, password: string, rememberMe: boolean, captcha: string | null ) => void
}

const Login: React.FC<MapStatePropsType & MapDispatchToProps> = ({ login, isAuth, error, captchaUrl }) => {
    
    const onSubmit = (formData: LoginFormValuesType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Navigate to={"/profile"} />;
    }

    return (
        <div className={loginStyles.loginPage}> {/* Добавили класс */}
            <h1 className={loginStyles.title}>Login</h1> {/* Добавили класс */}
            <LoginForm error={error} onSubmit={onSubmit} captchaUrl={captchaUrl} /> 
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login)