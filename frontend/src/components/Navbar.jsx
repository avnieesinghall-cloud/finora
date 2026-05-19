import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <div>
        <h2>Finora Dashboard</h2>
        <p>Track your finances smartly</p>
      </div>

      <div className="profile">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
        />
      </div>
    </div>
  );
}

export default Navbar;