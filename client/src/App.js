import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./views/Landing/landing";
import Home from "./views/Home/home";
import NavBar from "./components/NavBar/navBar";
import Detail from "./views/Detail/detail";
import Create from "./views/Form/create";
import { useEffect } from "react";
import { loadTemperaments } from "./redux/actions";
import { useDispatch } from "react-redux";
export default function App() {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTemperaments());
  }, [dispatch]);
  
  return (
    <div className="App">
      {location.pathname !== "/" && (
        <>
          <NavBar />
        </>
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}
