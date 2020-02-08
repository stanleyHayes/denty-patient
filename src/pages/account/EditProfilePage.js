import React, {useEffect, useState} from "react";
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

import {useHistory} from "react-router-dom";

import axios from "axios";

function EditProfilePage(props) {

    const style = {
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        flexDirection: "column",
        justifyContent: "center"
    };

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [existingUser, setExistingUser] = useState({});

    useEffect(function () {
        axios({
            method: "get",
            url: `http://localhost:5000/api/v1/users/${userID}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setExistingUser(response.data.user);
            console.log(response.data.user);
        }).catch(function (error) {
            console.log(error);
        });
    }, [userID, token, user]);

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

    function handleUserChange(formValue, event) {
        setUser({...user, [event.target.name]: event.target.value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        axios({
            method: "put",
            url: `http://localhost:5000/api/v1/users/${userID}`,
            data: user
        }).then(function (response) {
            if (response.status === 200) {
                showNotification(response.data.message, "success");
                props.handleUserData(response.data);
                history.push("/profile");
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
                        <h5 style={{textAlign: "center"}}>Edit Profile</h5>
                    </Col>
                    <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                        <Form fluid={true}>

                            <FormGroup>
                                <ControlLabel htmlFor="name">Name</ControlLabel>
                                <FormControl name="name" id="name" type="text" onChange={handleUserChange}
                                             placeholder={existingUser.name} required/>
                                <HelpBlock>This field is required</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel htmlFor="about">About</ControlLabel>
                                <FormControl name="about" id="about" type="text" onChange={handleUserChange}
                                             placeholder={(existingUser.about) ? (existingUser.about) : ("No about")}
                                             required/>
                            </FormGroup>

                            <FormGroup>
                                <Button block={true} color="green" size="lg" onClick={handleSubmit}
                                        onSubmit={handleSubmit}
                                        loading={loading} disabled={loading}>
                                    Update Profile
                                </Button>
                            </FormGroup>

                        </Form>
                    </Col>
                </Row>
            </Panel>
        </Container>
    )
}

export default EditProfilePage;
