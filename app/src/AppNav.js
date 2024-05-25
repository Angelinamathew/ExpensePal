import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';


function Example(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="example-container">
      <Navbar color="dark" dark expand="md" {...args} className="custom-navbar">
        <NavbarBrand href="/" className="brand">
          <img
            src="/logo.png" // Ensure you have a logo image in the public directory
            alt="Logo"
            className="brand-logo"
          />
          Reactstrap
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/Home/" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Categories/" className="nav-link">
                Categories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Expense/" className="nav-link">
                Expense
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
