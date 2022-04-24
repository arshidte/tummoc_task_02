import React from "react";
import { Container, Navbar } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar bg="light" className="mb-5">
      <Container>
        <Navbar.Brand href="#home">Test</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
