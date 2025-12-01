import React from "react"
import Profile from "./Profile"
import { connect } from "react-redux"
import { getStatus, getUserProfile, savePhoto, saveProfile, updateStatus } from "../../redux/profile-reducer"
import { Navigate, useLocation, useNavigate, useParams, Params } from "react-router-dom"
import { compose } from "redux"
import { AppStateType } from "../../redux/redux-store"
import { ProfileType } from "../../types/types"

// Типы пропсов, которые приходят из Redux через mapStateToProps
type MapPropsType = ReturnType<typeof mapStateToProps>

// Типы пропсов, которые приходят из Redux через mapDispatchToProps (actions)
type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (formData: ProfileType) => Promise<any>
}

// Типы пропсов, которые инжектируются HOC-ом withRouter
type RouterProps = {
  router: {
    location: ReturnType<typeof useLocation>
    navigate: ReturnType<typeof useNavigate>
    params: Readonly<Params<string>> // Параметры URL - это строки
  }
}

// Комбинированный тип для всех пропсов компонента ProfileContainer
type ProfileContainerProps = MapPropsType & DispatchPropsType & RouterProps


// --- Компонент ProfileContainer ---

class ProfileContainer extends React.Component<ProfileContainerProps> {
  
  // Метод для обновления данных профиля
  refreshProfile() {
    // Получаем userId из параметров URL и преобразуем в число (если не число, будет NaN)
    // Используем Number() для преобразования строки из параметров в число
    let userId: number | null = Number(this.props.router.params.userId)
    
    // Если в URL нет userId, используем id авторизованного пользователя из Redux
    if(!userId) {
      // FIX Ошибки: Присваивание теперь корректно, так как типы совпадают (number | null | undefined)
      userId = this.props.authorizedUserId
    }
  
    // Если userId существует (не null и не undefined), вызываем экшены
    if (userId) {
      this.props.getUserProfile(userId)
      this.props.getStatus(userId)
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  // Сравниваем предыдущие и текущие пропсы для предотвращения лишних запросов
  componentDidUpdate(prevProps: ProfileContainerProps, prevState: ProfileContainerProps) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    // Если нет ни параметра userId в URL, ни авторизованного пользователя, перенаправляем на логин
    if (!this.props.router.params.userId && !this.props.authorizedUserId) {
      return <Navigate to={"/login"} />
    }

    return (
      <Profile 
          {...this.props} 
          // Определяем, является ли текущий пользователь владельцем профиля
          isOwner={!this.props.router.params.userId} 
          savePhoto={this.props.savePhoto} 
          saveProfile={this.props.saveProfile} 
          profile={this.props.profile} 
          status={this.props.status} 
          updateStatus={this.props.updateStatus } 
      />
    )
  }
}


// --- Функции Redux и HOC withRouter ---

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

// HOC, который инжектирует роутер-пропсы в классовый компонент
export const withRouter = <P extends RouterProps>(Component: React.ComponentType<P>) => {
    const ComponentWithRouterProp = (props: Omit<P, keyof RouterProps>) => {
      const location = useLocation()
      const navigate = useNavigate()
      const params = useParams()
      
      return (
        <Component
          {...props as P} // Приведение типов, чтобы TypeScript знал, что пропсы роутера будут добавлены
          router={{ location, navigate, params }}
        />
      )
    }
    return ComponentWithRouterProp
}

// --- Композиция HOC-ов ---

export default compose<React.ComponentType>(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  // Если нужно, можно добавить withAuthNavigate здесь
)(ProfileContainer)
