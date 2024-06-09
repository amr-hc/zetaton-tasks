import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function MyNavbar() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/signin');
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Gallery</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? "text-success nav-link" : "nav-link";
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/images"
              className={({ isActive }) => {
                return isActive ? "text-success nav-link" : "nav-link";
              }}
            >
              Search
            </NavLink>
          </Nav>
          {user && (
            <>
              <NavLink
                to="/favorite"
                className={({ isActive }) => {
                  return isActive ? "text-success nav-link" : "nav-link";
                }}
              >
                <Button variant="primary">Favorite</Button>
              </NavLink>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </>
          )}
          {!user && (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  return isActive ? "text-success nav-link" : "nav-link";
                }}
              >
                <Button variant="success">Sign Up</Button>
              </NavLink>
              <NavLink
                to="/signin"
                className={({ isActive }) => {
                  return isActive ? "text-success nav-link" : "nav-link";
                }}
              >
                <Button variant="primary">Sign In</Button>
              </NavLink>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
