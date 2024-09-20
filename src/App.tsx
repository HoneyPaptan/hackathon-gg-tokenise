import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BrowseTasks from "./pages/BrowseTasks";
import Dashboard from "./pages/dashboard";
import Home from "./pages/Homepage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* This will stay on top for navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/browse-tasks" element={<BrowseTasks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
