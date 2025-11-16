import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
// import UsersContainer from "./components/users/UsersContainer";
import { withRouter } from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";

const DialogsContainer = React.lazy(() => import ("./components/dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/profile/ProfileContainer"));
const Login = React.lazy(() => import ("./components/login/Login"));
const UsersContainer = React.lazy(() => import ("./components/users/UsersContainer"));

class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
}

  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/dialogs" element={ <DialogsContainer /> } />
              <Route path="/profile/:userId?" element={ <ProfileContainer /> } /> 
              <Route path="/users" element={ <UsersContainer /> } />
              <Route path="/login" element={ <Login /> } />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return{
    initialized: state.app.initialized
  }
}

const AppContainer = compose( withRouter, connect( mapStateToProps, {initializeApp} ))(App);

const SamuraiJsApp = (props) => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContainer  />
      </BrowserRouter>
  )
}

export default SamuraiJsApp;

