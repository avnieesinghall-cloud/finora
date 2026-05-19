import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const closeSidebar = () => {
    if (setIsOpen) setIsOpen(false);
  };

  const scrollToSection = (id) => {
    navigate("/dashboard");

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    closeSidebar();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "show-overlay" : ""}`}
        onClick={closeSidebar}
      ></div>

      <div className={`sidebar ${isOpen ? "show-sidebar" : ""}`}>
        <h1 className="logo">Finora</h1>

        <ul>
          <li>
            <NavLink to="/dashboard" onClick={closeSidebar}>
              Dashboard
            </NavLink>
          </li>

          <li onClick={() => scrollToSection("analytics")}>
            Analytics
          </li>

          <li onClick={() => scrollToSection("transactions")}>
            Transactions
          </li>

          <li onClick={() => scrollToSection("budgets")}>
            Budgets
          </li>

          <li onClick={() => scrollToSection("settings")}>
            Settings
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;