import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { withRouter } from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { clearGlobalError, initializeApp, setGlobalError } from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import { withSuspense } from "./hoc/withSuspense";
import ErrorSnackbar from "./components/common/error/ErrorSnackbar";

const DialogsContainer = React.lazy(() => import ("./components/dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/profile/ProfileContainer"));
const Login = React.lazy(() => import ("./components/login/Login"));
const UsersContainer = React.lazy(() => import ("./components/users/UsersContainer"));

const DialogsSuspended = withSuspense(DialogsContainer);
const ProfileSuspended = withSuspense(ProfileContainer);
const UsersSuspended = withSuspense(UsersContainer);
const LoginSuspended = withSuspense(Login);

class App extends Component {
   // Обработчик для асинхронных ошибок (Promise rejections)
   catchAllUnhandledErrors = (promiseRejectionEvent) => {
    const errorReason = promiseRejectionEvent.reason ? promiseRejectionEvent.reason.message : "An unknown async error occurred";
    console.error("Global async error caught:", errorReason);
    this.props.setGlobalError(errorReason); 
    promiseRejectionEvent.preventDefault(); // Останавливаем распространение события, чтобы другие обработчики (вроде Overlay) его не видели
  }

  // НОВЫЙ ОБРАБОТЧИК ДЛЯ СИНХРОННЫХ ОШИБОК
  catchSyncErrors = (message, source, lineno, colno, error) => {
      console.error("Global sync error caught:", message);
      this.props.setGlobalError(message);
      // Возвращаем true, чтобы предотвратить стандартную обработку ошибки браузером
      return true; 
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    // Добавляем обработчик синхронных ошибок
    window.addEventListener("error", this.catchSyncErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    window.removeEventListener("error", this.catchSyncErrors);
  }

  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div className="app-wrapper">

        {/* Компонент для отображения ошибки с таймаутом */}
        {this.props.globalError && (
          <ErrorSnackbar 
            message={this.props.globalError} 
            clearError={this.props.clearGlobalError} 
          />
        )}

        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
            <Routes>
              <Route path="/dialogs" element={ <DialogsSuspended /> } />
              <Route path="/profile/:userId?" element={ <ProfileSuspended /> } /> 
              <Route path="/users" element={ <UsersSuspended /> } />
              <Route path="/login" element={ <LoginSuspended /> } />
              <Route path="/" element={<ProfileSuspended />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return{
    initialized: state.app.initialized,
    globalError: state.app.globalError
  }
}

const AppContainer = compose( withRouter, connect( mapStateToProps, {initializeApp, setGlobalError, clearGlobalError} ))(App);

const SamuraiJsApp = (props) => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContainer  />
      </BrowserRouter>
  )
}

export default SamuraiJsApp;

