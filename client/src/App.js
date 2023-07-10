import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing/landing";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>

    </div>
  );
}

