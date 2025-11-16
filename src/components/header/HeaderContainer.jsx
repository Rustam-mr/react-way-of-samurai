import Header from "./Header";
import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth, login: capitalizeFirstLetter(state.auth.login) });

export default connect(mapStateToProps, { logout })(HeaderContainer);