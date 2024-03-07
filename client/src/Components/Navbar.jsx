import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
            <Link to="/">
            <Navbar.Brand>Task Management</Navbar.Brand>
            </Link>   
            <Link to="/register">
                <Button variant="light">+ Add Tasks</Button>
            </Link>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
