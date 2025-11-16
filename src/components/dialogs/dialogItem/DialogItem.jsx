import { NavLink } from "react-router-dom";
import s from "./../style.module.css";

const DialogItem = ({id, name}) => {
    let path = "/dialogs/" + id
    
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink key={id} to={path}>{name}</NavLink>
        </div>
    );
}

export default DialogItem;