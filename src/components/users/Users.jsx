import Paginator from '../common/paginator/Paginator';
import User from './User';

const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
            <div>
                {users.map(u => <User key={u.id} user={u} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress} />)
                }
            </div>
        </div>
    )
}

export default Users;