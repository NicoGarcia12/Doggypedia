import { useEffect } from "react";
import style from "./home.module.css";
import Dogs from "../../components/Dogs/dogs";
import { useDispatch } from "react-redux";
import { loadTemperaments, peticionDogs } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(peticionDogs());
    dispatch(loadTemperaments());
  }, [dispatch]);

  return (
    <div className={style.homeContainer}>
      <Dogs />
    </div>
  );
}
