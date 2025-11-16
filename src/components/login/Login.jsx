import styles from "../common/formsControls/style.module.css";
import { Input } from "../common/formsControls/FormsControl";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form"; 

const maxLength30 = maxLengthCreator(30);

const LoginForm = ({ onSubmit, error }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const renderField = (label, name, validators, Component, inputProps, text, fieldStyle) => {
        const validationRules = {};
        if (validators) {
            validators.forEach(validator => {
                if (validator === required) validationRules.required = true;
            });
        }
        
        return (
            <div className={fieldStyle}>
                <Component {...register(name, validationRules)} {...inputProps} />
                {label && <label>{label}</label>}
                {text && <span>{text}</span>}
                {errors[name] && <span className={styles.errorText}>{errors[name].message || `${name} is required`}</span>}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}> 
            {renderField("Email", "email", [required, maxLength30], Input, { type: "email" })}
            {renderField("Password", "password", [required, maxLength30], Input, { type: "password" })}
            {renderField(null, "rememberMe", null, Input, { type: "checkbox" }, "remember me", styles.checkbox)}
            
            {error &&
                <div className={styles.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    );
}

const Login = ({ login, isAuth }) => {
    
    const onSubmit = (dataForm) => {
        login(dataForm.email, dataForm.password, dataForm.rememberMe);
    };

    if (isAuth) {
        return <Navigate to={"/profile"} />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit} /> 
        </div>
    );
}

const mapStateToProps = (state) => ({ 
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);