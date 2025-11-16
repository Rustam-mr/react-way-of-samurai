import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    };
}

export const withAuthNavigate = (Component) => {
    class NavigateComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={"/login"} />
            return <Component {...this.props} />
        }
    }
    
    const ConnectedAuthNavigateComponent = connect(mapStateToProps)(NavigateComponent);

    return ConnectedAuthNavigateComponent;
}