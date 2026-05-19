import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SettingsPanel() {
  const [theme, setTheme] = useState("dark");
  const [currency, setCurrency] = useState("INR");

  useEffect(() => {
    const savedTheme = localStorage.getItem("finoraTheme") || "dark";
    const savedCurrency = localStorage.getItem("finoraCurrency") || "INR";

    setTheme(savedTheme);
    setCurrency(savedCurrency);

    document.body.className = savedTheme === "light" ? "light-mode" : "";
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("finoraTheme", newTheme);

    document.body.className = newTheme === "light" ? "light-mode" : "";

    toast.success(`${newTheme === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    localStorage.setItem("finoraCurrency", e.target.value);
    toast.success("Currency updated");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/frontend/#/login";
  };

  return (
    <div className="chart-card settings-panel">
      <h2>Settings</h2>

      <div className="settings-grid">
        <div className="settings-box">
          <h3>Profile</h3>
          <p>Manage your Finora account preferences.</p>

          <div className="profile-mini">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
            />

            <div>
              <h4>Finora User</h4>
              <span>Premium finance dashboard</span>
            </div>
          </div>
        </div>

        <div className="settings-box">
          <h3>Theme</h3>
          <p>Switch between dark and light dashboard mode.</p>

          <button className="settings-btn" onClick={handleThemeChange}>
            {theme === "dark" ? "Enable Light Mode" : "Enable Dark Mode"}
          </button>
        </div>

        <div className="settings-box">
          <h3>Currency</h3>
          <p>Select your preferred currency display.</p>

          <select
            className="settings-select"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="INR">INR - ₹</option>
            <option value="USD">USD - $</option>
            <option value="EUR">EUR - €</option>
            <option value="GBP">GBP - £</option>
          </select>
        </div>

        <div className="settings-box danger-zone">
          <h3>Account</h3>
          <p>Logout from your current Finora session.</p>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;