import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Our App</h1>
      </header>
      <main className="landing-main">
        <section className="hero">
          <h2>Discover Amazing Cocktails</h2>
          <p>Explore a world of unique cocktails from our community.</p>
          <Link to="/explore" className="explore-button">
            Explore Cocktails
          </Link>
        </section>
        <section className="features">
          <div className="feature">
            <h3>Upload Your Cocktails</h3>
            <p>Share your favorite cocktails with the world.</p>
          </div>
          <div className="feature">
            <h3>Connect with Cocktail Enthusiasts</h3>
            <p>Join a community of cocktail lovers and enthusiasts.</p>
          </div>
          <div className="feature">
            <h3>Get Inspired</h3>
            <p>Find inspiration for your next cocktail creation.</p>
          </div>
        </section>
      </main>
      <footer className="landing-footer">
        <p>&copy; 2023 NightCap</p>
      </footer>
    </div>
  );
}

export default LandingPage;