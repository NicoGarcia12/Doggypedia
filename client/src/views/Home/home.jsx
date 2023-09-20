import style from "./home.module.css";
import Dogs from "../../components/Dogs/dogs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { peticionDogs } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(peticionDogs());
  }, [dispatch]);
  return (
    <div className={style.homeContainer}>
      <Dogs />
    </div>
  );
}
