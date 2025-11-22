import Paginator from '../common/paginator/Paginator';
import User from './User';
import s from "./style.module.css"; // Import the CSS module

const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
    return (
        // Add a main container class for overall styling
        <div className={s.usersContainer}> 
            {/* Paginator will be styled to fit the VK aesthetic separately if needed, but its wrapper is now styled */}
            <Paginator 
                totalItemsCount={totalUsersCount} 
                pageSize={pageSize} 
                currentPage={currentPage} 
                onPageChanged={onPageChanged} 
            />
            {/* User list container */}
            <div className={s.userList}>
                {users.map(u => <User 
                                    key={u.id} 
                                    user={u} 
                                    follow={props.follow} 
                                    unfollow={props.unfollow} 
                                    followingInProgress={props.followingInProgress} 
                                />)
                }
            </div>
        </div>
    )
}

export default Users;