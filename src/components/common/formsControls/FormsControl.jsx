import React from "react";
import styles from "./style.module.css";

export const Textarea = React.forwardRef(({ error, ...props }, ref) => {
    const hasError = !!error; 

    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <div>
                <textarea ref={ref} {...props} />
            </div>
            {hasError && <span>{error.message}</span>}
        </div>
    );
});
Textarea.displayName = 'Textarea';


export const Input = React.forwardRef(({ error, ...props }, ref) => {
    const hasError = !!error;

    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <div>
                <input ref={ref} {...props} />
            </div>
             {hasError && <span>{error.message}</span>}
        </div>
    );
});
Input.displayName = 'Input';


