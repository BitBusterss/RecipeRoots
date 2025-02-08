import React, { useState, useEffect } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import InputForm from "./InputForm";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);

  let user=JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <header>
        <h2>
          <i>RecipeRoots</i>
        </h2>

        {/* Hamburger Button */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <ul className={menuOpen ? "nav-open" : ""}>
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li
            onClick={() => isLogin && setIsOpen(true)}
          >
            <NavLink to={!isLogin ? "/myRecipe" : "/"} onClick={() => setMenuOpen(false)}>
              My Recipe
            </NavLink>
          </li>
          <li
            onClick={() => isLogin && setIsOpen(true)}
          >
            <NavLink to={!isLogin ? "/favRecipe" : "/"} onClick={() => setMenuOpen(false)}>
              Favourites
            </NavLink>
          </li>
          <li onClick={checkLogin}>
            <NavLink className="login">{isLogin ? "Login" : "Logout"}{user?.email?`  ${user?.email}`:""}</NavLink>
          </li>
        </ul>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
