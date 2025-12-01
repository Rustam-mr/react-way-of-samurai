import { connect } from "react-redux"
import { actions } from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"
import { withAuthNavigateWCP } from "../../hoc/withAuthNavigate"
import { compose } from "redux"
import { AppStateType } from "../../redux/redux-store"
import React from "react"

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        authorizedUserId: state.auth.userId
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthNavigateWCP
)(Dialogs) 
