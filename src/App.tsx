import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./components/navbar/Navbar"
import { withRouter } from "./components/profile/ProfileContainer"
import HeaderContainer from "./components/header/HeaderContainer"
import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { initializeApp, setAppGlobalError, actions } from "./redux/app-reducer"
import Preloader from "./components/common/preloader/Preloader"
import { withSuspense } from "./hoc/withSuspense"
import ErrorSnackbar from "./components/common/error/ErrorSnackbar"
import { AppStateType } from "./redux/redux-store"

const DialogsContainer = React.lazy(() => import ("./components/dialogs/DialogsContainer")) 
const ProfileContainer = React.lazy(() => import ("./components/profile/ProfileContainer"))
const Login = React.lazy(() => import ("./components/login/Login"))
const UsersContainer = React.lazy(() => import ("./components/users/UsersContainer"))

const DialogsSuspended = withSuspense(DialogsContainer)
const ProfileSuspended = withSuspense(ProfileContainer)
const UsersSuspended = withSuspense(UsersContainer)
const LoginSuspended = withSuspense(Login)

type PropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  setAppGlobalError: (message: string) => void
  initializeApp: () => void
  clearGlobalError: () => void
}
type ActionsPropsType = typeof actions
// Объедините все пропсы для класса App
type AppProps = PropsType & DispatchPropsType & ActionsPropsType

class App extends Component<AppProps> {
   // Обработчик для асинхронных ошибок (Promise rejections)
   catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    const errorReason = promiseRejectionEvent.reason ? promiseRejectionEvent.reason.message : "An unknown async error occurred"
    console.error("Global async error caught:", errorReason);
    this.props.setAppGlobalError(errorReason)
    promiseRejectionEvent.preventDefault() // Останавливаем распространение события, чтобы другие обработчики (вроде Overlay) его не видели
  }

  // НОВЫЙ ОБРАБОТЧИК ДЛЯ СИНХРОННЫХ ОШИБОК
  // ИСПРАВЛЕНИЕ ЗДЕСЬ: Используем объект event типа ErrorEvent
  catchSyncErrors = (event: ErrorEvent) => {
    const message = event.message || "An unknown sync error occurred";
    console.error("Global sync error caught:", message)
    this.props.setAppGlobalError(message)
    // Возвращаем true, чтобы предотвратить стандартную обработку ошибки браузером
    return true 
}

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    // Добавляем обработчик синхронных ошибок
    window.addEventListener("error", this.catchSyncErrors)
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    window.removeEventListener("error", this.catchSyncErrors)
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
              <Route path="/users" element={ <UsersSuspended pageTitle={"Samurai"} /> } />
              <Route path="/login" element={ <LoginSuspended /> } />
              <Route path="/" element={<ProfileSuspended />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: AppStateType) => {
  return{
    initialized: state.app.initialized,
    globalError: state.app.globalError
  }
}

const AppContainer = compose<React.ComponentType>( withRouter, connect( mapStateToProps, { initializeApp, setAppGlobalError, ...actions } ))(App)

const SamuraiJsApp: React.FC = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContainer  />
      </BrowserRouter>
  )
}

export default SamuraiJsApp

