import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Importing Pages (We will create these in the next step)
import HomePage from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactsPage from './pages/ContactsPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">My Portfolio</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/services">Services</Link>
            <Link to="/contacts">Contacts</Link>
            <Link to="/users">Users (Admin)</Link>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;