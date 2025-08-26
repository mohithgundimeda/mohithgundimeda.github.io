import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import BootSettingScreen from "./BootSettingScreen";
import WelcomePage from "./WelcomePage";
import Desktop from "./Desktop";


function DesktopRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      navigate("/welcome");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    navigate("/welcome");
  };

  return <Desktop onLogout={handleLogout} />;
}

function WelcomeRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      navigate("/desktop");
    }
  }, [navigate]);

  return <WelcomePage />;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BootSettingScreen />} />
        <Route path="/welcome" element={<WelcomeRoute />} />
        <Route path="/desktop" element={<DesktopRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
