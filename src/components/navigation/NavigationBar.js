import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container} from "react-bootstrap";

function NavigationBar(props) {

    return (
        <Navbar expand="lg" variant="dark" bg="dark" collapseOnSelect={true}>
            <Container>
                <Navbar.Brand href="/">Denty Dentist</Navbar.Brand>

                <Navbar.Toggle/>

                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        <Nav.Link>
                            <Link className="text-white" to="/">
                                Home
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link className="text-white" to="/appointments">
                                Appointments
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link className="text-white" to="/records">
                                Records
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link className="text-white" to="/articles">
                                Articles
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link className="text-white" to="/new">
                                Create
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link className="text-white" to="/dentists">
                                Dentists
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link className="text-white" to="/account">
                                Account
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;