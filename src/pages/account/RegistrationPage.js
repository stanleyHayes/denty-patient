import React, {useState} from "react";
import {
    Button,
    Col,
    Container,
    FormControl,
    FormGroup,
    HelpBlock,
    Row,
    Notification, DatePicker, Panel
} from "rsuite";

import {Form} from "react-bootstrap";

import {Link, useHistory} from "react-router-dom";

import axios from "axios";

function RegistrationPage(props) {

    const style = {
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        flexDirection: "column",
        justifyContent: "center"
    };

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [user, setUser] = useState({});
    const [confirmPassword, setConfirmPassword] = useState("");

    function showNotification(message, status) {
        if (status === "error") {
            Notification.error({
                title: "Registration Failed",
                description: message
            });
        } else {
            Notification.success({
                title: "Registration Succeeded",
                description: message
            });
        }
    }

    function handleChangeVisibility() {
        setVisibility(!visibility);
    }

    function handleUserChange(formValue, event) {
        setUser({...user, [event.target.name]: event.target.value});
    }

    function handleConfirmPasswordChange(formValue, event) {
        setConfirmPassword(formValue);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (confirmPassword !== user.password) {
            setLoading(false);
            showNotification("Passwords do not match", "error");
        } else {
            setLoading(true);
            axios({
                method: "post",
                url: "http://localhost:5000/api/v1/users/register",
                data: user
            }).then(function (response) {
                if (response.status === 201) {
                    showNotification(response.data.message, "success");
                    history.push("/login");
                    console.log(response);
                } else {
                    setLoading(false);
                    showNotification(response.data.error, "error");
                }

            }).catch(function (error) {
                setLoading(false);
                showNotification("Email already in use", "error");
                console.log(error);
                console.log(`Error.Error${error.error}`);
            }).finally(function () {
                setLoading(false);
            });
        }
    }

    return (
        <div style={{backgroundColor: "#ddd"}} className="py-5">
            <Container>
                <Row style={style}>
                    <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                        <Panel style={{backgroundColor: "white", borderRadius: "24px"}} className="shadow-sm">
                            <div className="mb-5">
                                <h1 className="text-center">Denty Dentist</h1>
                                <h5 className="text-center">Sign Up</h5>
                            </div>
                            <Form fluid={true}>
                                <Form.Group>
                                    <Form.Label htmlFor="name">Name</Form.Label>
                                    <Form.Control
                                        className="rounded-pill"
                                        name="name"
                                        placeholder="Enter Name"
                                        id="name"
                                        required
                                        onChange={handleUserChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control
                                        className="rounded-pill"
                                        name="email"
                                        id="email"
                                        placeholder="Enter Email"
                                        type="email"
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="username">Username</Form.Label>
                                    <Form.Control
                                        className="rounded-pill"
                                        name="username"
                                        id="username"
                                        placeholder="Enter Username"
                                        type="text"
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="username">Birthday</Form.Label>
                                    <DatePicker
                                        block={true}
                                        className="rounded-pill"
                                        name="birthday"
                                        placeholder="Select Birthday"
                                        id="username"
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control
                                        className="rounded-pill"
                                        name="password"
                                        id="password"
                                        placeholder="Enter Password"
                                        type={(visibility) ? "text" : "password"}
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>


                                <Form.Group>
                                    <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
                                    <Form.Control
                                        placeholder="Confirm Password"
                                        className="rounded-pill"
                                        name="confirm-password"
                                        id="conform-password"
                                        type={(visibility) ? "text" : "password"}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    />

                                    <Button
                                        onClick={handleChangeVisibility}
                                        appearance="link"
                                        size="sm"
                                        style={{float: "right"}}>
                                        {(visibility) ? "Hide Password" : "Show Password"}
                                    </Button>

                                </Form.Group>

                                <Form.Group>
                                    <Button
                                        className="rounded-pill"
                                        block={true}
                                        color="green"
                                        size="sm"
                                        onClick={handleSubmit}
                                        onSubmit={handleSubmit}
                                        loading={loading}
                                        disabled={loading}>
                                        Sign Up
                                    </Button>

                                    <Button
                                        block={true}
                                        size="sm"
                                        style={{textAlign: "center"}}
                                        appearance="link">
                                        <Link to="/login">
                                            Already have an account? Login here
                                        </Link>
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Panel>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegistrationPage;
