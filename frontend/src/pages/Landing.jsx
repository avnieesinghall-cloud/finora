import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-page">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <nav className="landing-nav">
        <h2>Finora</h2>

        <div>
          <Link to="/login">Login</Link>

          <Link to="/register" className="nav-btn">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content animate-up">
          <span className="badge">
            AI Powered Finance Dashboard
          </span>

          <h1>
            Track money smarter with a premium expense tracker.
          </h1>

          <p>
            Finora helps you manage income, expenses,
            budgets, analytics, and AI spending insights
            in one beautiful dashboard.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Start Tracking
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>

        <div className="hero-card animate-card">
          <div className="mini-card">
            <p>Total Balance</p>
            <h2>₹53,053</h2>
          </div>

          <div className="mini-grid">
            <div>
              <p>Income</p>
              <h3>₹57,000</h3>
            </div>

            <div>
              <p>Expenses</p>
              <h3>₹3,947</h3>
            </div>
          </div>

          <div className="chart-preview">
            <span style={{ height: "45%" }}></span>
            <span style={{ height: "70%" }}></span>
            <span style={{ height: "35%" }}></span>
            <span style={{ height: "90%" }}></span>
            <span style={{ height: "60%" }}></span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Smart Analytics</h3>

          <p>
            Visualize spending habits with real-time charts.
          </p>
        </div>

        <div className="feature-card">
          <h3>AI Insights</h3>

          <p>
            Get intelligent suggestions based on your expenses.
          </p>
        </div>

        <div className="feature-card">
          <h3>Full CRUD</h3>

          <p>
            Add, edit, delete, and manage transactions easily.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landing;