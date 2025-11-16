import { connect } from "react-redux";
import { toggleFollowingProgress, requestUsers, follow, unfollow } from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsAuth, getIsFetching, getPageSize, getTotalCount, getUsers } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

onPageChanged = (pageNumber) => {
    const pageSize = this.props;
    this.props.getUsers(pageNumber, pageSize)
}
    
    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged} users={this.props.users} follow={this.props.follow}
                       unfollow={this.props.unfollow} toggleFollowingProgress={this.props.toggleFollowingProgress}
                       followingInProgress={this.props.followingInProgress} isAuth={this.props.isAuth}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state)
    }
}

export default compose(
    connect(mapStateToProps, { unfollow, follow, toggleFollowingProgress, getUsers: requestUsers }))(UsersContainer);

