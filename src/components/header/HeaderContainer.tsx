import Header, { DispatchPropsType, MapPropsType } from "./Header"
import React from "react"
import { connect } from "react-redux"
import { logout } from "../../redux/auth-reducer"
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter"
import { AppStateType } from "../../redux/redux-store"

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({ 
    isAuth: state.auth.isAuth, 
    login: capitalizeFirstLetter(state.auth.login),
    logout: () => {}
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);