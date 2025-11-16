import s from "./style.module.css"

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPyWVcIFdfPf4sRTbujBB4PdB4ZQad8GwZag&s" alt="" />
            post {props.post} <br />
            {props.message} <br />
            {props.name}
            <div>
                <span>{props.likes}</span> {props.likesCount}
            </div>
        </div>
    );
}

export default Post