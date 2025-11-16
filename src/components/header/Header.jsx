import { NavLink } from "react-router-dom";
import s from "./style.module.css";

const Header = ({login, logout, isAuth}) => {
  
    return (
      <header className={s.header}>
        <img className={s.header__logo} src="https://png.pngtree.com/png-vector/20210413/ourmid/pngtree-business-company-logo-design-png-image_3204914.jpg" alt='logo' />
        <div className={s.loginBlock}>
          {isAuth ? <div>{login} <button onClick={logout}>Logout</button></div> : <NavLink to={'/login'}>Login</NavLink>}
        </div>
      </header>
    );
}

export default Header;
