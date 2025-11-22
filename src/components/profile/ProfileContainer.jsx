import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getStatus, getUserProfile, savePhoto, saveProfile, updateStatus } from "../../redux/profile-reducer";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.router.params.userId

    if(!userId) {
      userId = this.props.authorizedUserId
    }
  
    if (userId) {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    if (!this.props.router.params.userId && !this.props.authorizedUserId) {
      return <Navigate to={"/login"} />
    }

    return (
      <Profile {...this.props} isOwner={!this.props.router.params.userId} savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus } />
    )
  }
    
}


const mapStateToProps = (state) => {
    
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

export const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      const location = useLocation();
      const navigate = useNavigate();
      const params = useParams();
      
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    };
    return ComponentWithRouterProp;
};

export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  // withAuthNavigate
)(ProfileContainer)
