import React from "react";
import { Textarea } from "../../common/formsControls/FormsControl";
import Post from "./post/Post";
import s from "./style.module.css";
import { useForm } from "react-hook-form"; 


const AddNewPostForm = React.memo(({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Textarea 
                    {...register("newPostText", { 
                        required: "Field is required",
                        maxLength: {
                            value: 10,
                            message: "Max length is 10 characters"
                        }
                    })} 
                    placeholder="Add post" 
                />
                {errors.newPostText && <span className={s.error}>{errors.newPostText.message}</span>}
            </div>
            <div>
                <button type="submit">Add post</button>
            </div>
        </form>
    );
});


const MyPosts = ({ posts, addPost }) => {
    const postElements = posts.map( p => <Post key={p.id} message={p.message} likes={p.likes} likesCount={p.likesCount} />);

    const onAddPost = (values) => {
      
        addPost(values.newPostText);
    };

    return (
      <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
          <div>
            <AddNewPostForm onSubmit={onAddPost} />
          </div>
        </div>
        <div className={s.posts}>
          {postElements}
        </div>
      </div>
    );
};

export default MyPosts;
