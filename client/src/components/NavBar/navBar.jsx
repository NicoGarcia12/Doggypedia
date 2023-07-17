import { NavLink } from "react-router-dom";
import style from "./navBar.module.css";

export default function NavBar() {
    return (
      <div className={style.navBarContainer}>
        <NavLink to={"/home"}>
          Home
        </NavLink>
        <h3>NavBar</h3>
        <NavLink to={"/create"}>
          Formulario
        </NavLink>
      </div>
    );
  }
  