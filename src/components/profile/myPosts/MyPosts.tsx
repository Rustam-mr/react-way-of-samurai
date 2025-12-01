import React, { memo } from "react"
// Assuming Textarea is a functional component that accepts props including 'ref'
import Post from "./post/Post"
import s from "./style.module.css"
import AddMessageForm from "../../dialogs/addMessageForm/AddMessageForm";
import { NewMessageFormType, PostType } from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void 
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = ({ posts, addPost }) => {
    const postElements = posts.map(p => <Post key={p.id} name={p.name} message={p.message} likes={p.likes} likesCount={p.likesCount} avatar={p.avatar} />);

    const onAddPost = (values: NewMessageFormType) => {
        addPost(values.newPostText)
    }

    return (
      <div className={s.postsBlock}>
        <h3 className={s.postsTitle}>My posts</h3>
        <div className={s.newPostContainer}>
          <AddMessageForm onSubmit={onAddPost} />
        </div>
        <div className={s.posts}>
          {postElements}
        </div>
      </div>
    );
};

const MyPostsMemorized = memo(MyPosts)

export default MyPostsMemorized
