import style from "./home.module.css";
import Dogs from "../../components/Dogs/dogs";

export default function Home() {

  return (
    <div className={style.homeContainer}>
      <Dogs />
    </div>
  );
}
