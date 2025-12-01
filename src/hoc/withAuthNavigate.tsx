import React, { ComponentType } from "react" // Добавлен FC
import { connect } from "react-redux" // Добавлен ConnectedProps
import { Navigate } from "react-router-dom"
import { AppStateType } from "../redux/redux-store"

let mapStateToPropsForNavigate = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type DispatchPropsType = {
    fake: () => void
}

type MapPropsType = {
    isAuth: boolean | null
}



// HOC: WCP - это пропсы исходного компонента, которые мы хотим сохранить
export const withAuthNavigateWCP = <WCP extends {}>(
    WrappedComponent: ComponentType<WCP>
) => {
    // Внутренний компонент получает ВСЕ пропсы: WCP и PropsFromRedux
    // Используем FC<any> чтобы упростить жизнь TypeScript здесь
    const NavigateComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => { 
        // Деструктурируем isAuth и собираем остальные пропсы
        const {isAuth, fake, ...restProps} = props
        
        if (!isAuth) {
            return <Navigate to={"/login"} />
        }

        // 3. Возвращаем WrappedComponent с пропсами, которые остались.
        // Используем приведение типа as WCP
        return <WrappedComponent {...(restProps as WCP)} />
    }

    // 1. Создаем "коннектор" для извлечения типов пропсов
    const connector = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForNavigate, {fake: () => {}});
    
    // 4. Connect оборачивает NavigateComponent. 
    // TypeScript теперь принимает NavigateComponent с any пропсами.
    const ConnectedAuthNavigateComponent = connector(NavigateComponent)

    // 5. Возвращаем компонент, который ожидает только пропсы типа WCP.
    return ConnectedAuthNavigateComponent as ComponentType<WCP>; // Уточняем конечный тип
}