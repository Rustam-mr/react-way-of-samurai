import React, { InputHTMLAttributes, Ref, TextareaHTMLAttributes } from "react"
import styles from "./style.module.css"
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

interface CustomFormControlProps {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, CustomFormControlProps {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, CustomFormControlProps {}

export const Textarea = React.forwardRef((
    { error, ...props }: TextAreaProps, 
    ref: Ref<HTMLTextAreaElement>
) => {
    const hasError = !!error
    const errorMessage = error?.message as string

    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <div>
                <textarea ref={ref as Ref<HTMLTextAreaElement>} {...props} />
            </div>
            {hasError && errorMessage && <span>{errorMessage}</span>}
        </div>
    )
})
Textarea.displayName = 'Textarea'


export const Input = React.forwardRef((
    { error, ...props }: InputProps, 
    ref: Ref<HTMLInputElement>
) => {
    const hasError = !!error
    const errorMessage = error?.message as string

    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <div>
                <input ref={ref as Ref<HTMLInputElement>} {...props} />
            </div>
             {hasError && errorMessage && <span>{errorMessage}</span>}
        </div>
    )
})
Input.displayName = 'Input'

export type GetStringKeys<T> = Extract<keyof T, string> 


