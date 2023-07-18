import { NavLink } from "react-router-dom";
import style from "./navBar.module.css";

export default function NavBar() {
  return (
    <div className={style.navBarContainer}>
      <div className={style.navSection}>
        <NavLink to={"/home"} className={style.navLink}>
          <button>Home</button>
        </NavLink>
      </div>
      <div className={style.navSection}>
        <NavLink to={"/create"} className={style.navLink}>
          <button>Create</button>
        </NavLink>
      </div>
    </div>
  );
}
