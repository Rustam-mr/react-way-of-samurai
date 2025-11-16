import React from 'react'; 
import { useForm } from 'react-hook-form'; 
import { Textarea } from "../../common/formsControls/FormsControl";

const AddMessageForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Textarea 
                    {...register("newMessageBody", { 
                        required: "Message is required",
                        maxLength: {
                            value: 20, 
                            message: "Max length is 20 characters"
                        }
                    })} 
                    placeholder={"Enter your message"} 
                />
                {errors.newMessageBody && <span className="error">{errors.newMessageBody.message}</span>}
            </div>
            <div>
                <button type="submit">Send</button>
            </div>
        </form>
    );
};

export default AddMessageForm;
