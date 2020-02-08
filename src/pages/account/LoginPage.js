import React, {useState} from "react";
import {
    Button,
    Col,
    Container,
    ControlLabel,
    FormControl,
    FormGroup,
    HelpBlock,
    Row,
    Notification, Panel
} from "rsuite";

import {Link, useHistory} from "react-router-dom";

import axios from "axios";
import {Form} from "react-bootstrap";

function LoginPage(props) {

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

    function showNotification(message, status) {
        if (status === "error") {
            Notification.error({
                title: "Failure",
                description: message
            });
        } else {
            Notification.success({
                title: "Success",
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

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        axios({
            method: "post",
            url: "http://localhost:5000/api/v1/users/login",
            data: user
        }).then(function (response) {
            if (response.status === 200) {
                showNotification(response.data.message, "success");
                props.handleUserData(response.data);
                localStorage.setItem("user_id", response.data.user._id);
                localStorage.setItem("token", response.data.token);
                history.push("/");
            } else {
                setLoading(false);
                showNotification(response.data.error, "error");
            }

        }).catch(function (error) {
            setLoading(false);
            showNotification("Something Went Wrong", "error");
        }).finally(function () {
            setLoading(false);
        });
    }

    return (

        <div style={{backgroundColor: "#ddd"}} className="py-5">
            <Container>
                <Row style={style}>
                    <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                        <Panel style={{backgroundColor: "white", borderRadius: "24px"}} className="shadow-sm">
                            <div className="mb-5">
                                <h1 className="text-center">Denty Dentist</h1>
                                <h5 className="text-center">Sign In</h5>
                            </div>

                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control
                                        placeholder="Enter Email"
                                        className="rounded-pill"
                                        name="email"
                                        id="email"
                                        type="email"
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control
                                        placeholder="Enter Password"
                                        className="rounded-pill"
                                        name="password"
                                        id="password"
                                        type={(visibility) ? "text" : "password"}
                                        onChange={handleUserChange}
                                        required
                                    />

                                    <Button
                                        onClick={handleChangeVisibility}
                                        appearance="link"
                                        size="sm"
                                        className="rounded-pill"
                                        style={{float: "right"}}>
                                        {(visibility) ? "Hide Password" : "Show Password"}
                                    </Button>
                                </Form.Group>

                                <Form.Group>
                                    <Button
                                        block={true}
                                        color="green"
                                        size="sm"
                                        onClick={handleSubmit}
                                        onSubmit={handleSubmit}
                                        loading={loading}
                                        disabled={loading}>
                                        Sign In
                                    </Button>

                                    <Button
                                        block={true}
                                        size="sm"
                                        style={{textAlign: "center"}}
                                        appearance="link">
                                        <Link to="/register">
                                            Don't have an account? Sign up here
                                        </Link>
                                    </Button>
                                </Form.Group>

                                <Button
                                    block={true}
                                    size="sm"
                                    appearance="link"
                                    style={{textAlign: "center"}}>
                                    <Link to="/forgotten-password">
                                        Forgotten Password?
                                    </Link>
                                </Button>
                            </Form>
                        </Panel>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginPage;
