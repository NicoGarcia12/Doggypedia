import { NavLink } from "react-router-dom";
import style from "./landing.module.css";

export default function Landing() {
  return (
    <div className={style.landingContainer}>
      <div className={style.entry}>
        <h1>Welcome to the dogs page</h1>
        <NavLink to={"/home"}>
          <button type="button">Enter</button>
        </NavLink>
      </div>
    </div>
  );
}
