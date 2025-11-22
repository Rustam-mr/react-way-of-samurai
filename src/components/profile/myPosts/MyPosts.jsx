import React from "react";
// Assuming Textarea is a functional component that accepts props including 'ref'
import { Textarea } from "../../common/formsControls/FormsControl";
import Post from "./post/Post";
import s from "./style.module.css";
import { useForm } from "react-hook-form"; 

const AddNewPostForm = React.memo(({ onSubmit }) => {
    // Register the input using the ref pattern as Textarea is a custom component
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { ref: newPostTextRef, ...newPostTextRest } = register("newPostText", { 
        required: "Field is required",
        maxLength: {
            value: 10,
            message: "Max length is 10 characters"
        }
    });
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.addPostForm}>
            <div className={s.formControl}>
                <Textarea 
                    {...newPostTextRest}
                    ref={newPostTextRef} // Pass the ref separately
                    placeholder="Add post" 
                    className={s.textarea} // Apply specific style to textarea
                />
                {errors.newPostText && <span className={s.error}>{errors.newPostText.message}</span>}
            </div>
            <div>
                <button type="submit" className={s.addButton}>Add post</button>
            </div>
        </form>
    );
});


const MyPosts = ({ posts, addPost }) => {
    const postElements = posts.map(p => <Post key={p.id} name={p.name} message={p.message} likes={p.likes} likesCount={p.likesCount} avatar={p.avatar} />);

    const onAddPost = (values) => {
        addPost(values.newPostText);
    };

    return (
      <div className={s.postsBlock}>
        <h3 className={s.postsTitle}>My posts</h3>
        <div className={s.newPostContainer}>
          <AddNewPostForm onSubmit={onAddPost} />
        </div>
        <div className={s.posts}>
          {postElements}
        </div>
      </div>
    );
};

export default MyPosts;
