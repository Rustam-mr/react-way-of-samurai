import { NavLink } from "react-router-dom";
import styles from './style.module.css';
import userPhoto from '../../assets/images/avatar.png';

const User = ({user, follow, unfollow, followingInProgress}) => {
    return (
        <div>
            <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img className={styles.userPhoto} src={user.photos.small != null ? user.photos.small : userPhoto } alt="" />
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { 
                                unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { 
                                follow(user.id)
                        }}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status ? user.status : <div style={{color: 'yellow', fontSize: 28}}>No status</div>}</div>
                    </span>
                    <span>
                        <div>user.location.country</div>
                        <div>user.location.city</div>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default User;