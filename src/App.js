import React, { useState } from "react";
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  // Global flag to determine which component to render
  const [flag, setFlag] = useState(0);
  const register = () => setFlag(0);
  const gotoProfile = () => setFlag(1);
  const signout = () => setFlag(2);
  const login = () => setFlag(2);

  return (
    <Router>
      <div className="App">
        {/* Register Component */}
        <Route
          exact
          path="/"
          component={() => (
            <Register flag={flag} gotoProfile={gotoProfile} login={login} />
          )}
        />
        {/* Login Component */}
        <Route
          exact
          path="/login"
          component={() => (
            <Login flag={flag} register={register} gotoProfile={gotoProfile} />
          )}
        />
        {/* Profile Component */}
        <Route
          exact
          path="/profile"
          component={() => <Profile flag={flag} signout={signout} />}
        />
      </div>
    </Router>
  );
}

export default App;
