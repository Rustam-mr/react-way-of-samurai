import { connect } from "react-redux"
import { actions } from "../../../redux/profile-reducer"
import MyPostsMemorized, { DispatchPropsType, MapPropsType } from "./MyPosts"
import { AppStateType } from "../../../redux/redux-store"

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  } as MapPropsType
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPostsMemorized)

export default MyPostsContainer
