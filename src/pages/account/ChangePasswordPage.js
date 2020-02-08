import React, {useState} from "react";
import {
    Button,
    Col,
    Container,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    HelpBlock,
    Row,
    Notification, Panel
} from "rsuite";

import {Link, useHistory} from "react-router-dom";

import axios from "axios";

function ChangePasswordPage(props) {

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
            url: "http://localhost:5000/api/v1/users/change-password",
            data: user
        }).then(function (response) {
            if (response.status === 200) {
                showNotification(response.data.message, "success");
                props.handleUserData(response.data);
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
        <Container>
            <Panel style={{backgroundColor: "whitesmoke", borderRadius: "24px"}} className="shadow-sm">
                <Row style={style}>
                    <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                        <h1 style={{textAlign: "center"}}>Bisa</h1>
                        <h5 style={{textAlign: "center"}}>Change Password</h5>
                    </Col>
                    <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                        <Form fluid={true}>

                            <FormGroup>
                                <ControlLabel htmlFor="email">Email</ControlLabel>
                                <FormControl name="email" id="email" type="email" onChange={handleUserChange} required/>
                                <HelpBlock>This field is required</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel htmlFor="old-password">Old Password</ControlLabel>
                                <FormControl name="old-password" id="old-password"
                                             type={(visibility) ? "text" : "password"}
                                             onChange={handleUserChange} required/>
                                <HelpBlock>This field is required</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel htmlFor="new-password">New Password</ControlLabel>
                                <FormControl name="new-password" id="new-password"
                                             type={(visibility) ? "text" : "password"}
                                             onChange={handleUserChange} required/>
                                <HelpBlock>This field is required</HelpBlock>

                                <Button onClick={handleChangeVisibility} appearance="primary" size="lg"
                                        style={{float: "right"}}>
                                    {(visibility) ? "Hide" : "Show"}
                                </Button>
                            </FormGroup>


                            <FormGroup>
                                <Button block={true} color="green" size="lg" onClick={handleSubmit}
                                        onSubmit={handleSubmit}
                                        loading={loading} disabled={loading}>
                                    Change Password
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Panel>
        </Container>
    )
}

export default ChangePasswordPage;
