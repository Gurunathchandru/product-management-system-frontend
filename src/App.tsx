import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import ProductPage from "./components/productform";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/product" element={<ProductPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
