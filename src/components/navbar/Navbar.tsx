import { NavLink } from "react-router-dom";
import s from "./style.module.css";
// Импорт иконок из React Icons (пример)
import { 
    FaUser, 
    FaEnvelope, 
    FaUsers, 
    FaNewspaper, 
    FaMusic, 
    FaCog 
} from 'react-icons/fa';
import React from "react";

const Navbar: React.FC = () => {
    // Вспомогательная функция для определения активного класса
    const getNavLinkClass = ({ isActive }) => isActive ? s.active : '';

    return (
      <nav className={s.nav}>
        <ul className={s.list}>
          <li className={s.item}>
            <NavLink to='/profile' className={getNavLinkClass}>
                <FaUser className={s.icon} /> {/* Иконка */}
                Profile
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to='/dialogs' className={getNavLinkClass}>
                <FaEnvelope className={s.icon} /> {/* Иконка */}
                Messages
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to='/users' className={getNavLinkClass}>
                <FaUsers className={s.icon} /> {/* Иконка */}
                Users
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to='/news' className={getNavLinkClass}>
                <FaNewspaper className={s.icon} /> {/* Иконка */}
                News
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to='/music' className={getNavLinkClass}>
                <FaMusic className={s.icon} /> {/* Иконка */}
                Music
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to='/settings' className={getNavLinkClass}>
                <FaCog className={s.icon} /> {/* Иконка */}
                Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    );
}

export default Navbar;