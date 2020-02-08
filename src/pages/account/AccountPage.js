import React, {useState} from "react";
import Layout from "../../components/layout/Layout";
import {Button, Col, Container, Divider, List, Notification, Panel, Row} from "rsuite";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function AccountPage(props) {

    const history = useHistory();

    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

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

    function handleLogout(event) {
        event.preventDefault();
        axios({
            method: "post",
            url: "http://localhost:5000/api/v1/users/logout",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            localStorage.clear();
            history.push("/login");
        }).catch(function (error) {
            showNotification(error.message, "error");
        })
    }

    function handleDeactivate(event) {

    }

    return (
        <Layout>
            <Container>
                <Row style={{
                    display: "flex",
                    minHeight: "93vh",
                    width: "100vw",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "whitesmoke"
                }}>
                    <Col smOffset={2} xs={20} sm={20} xsOffset={2} mdOffset={2} md={20} lgOffset={6} lg={12}>
                        <Panel style={{backgroundColor: "white", borderRadius: "24px"}} className="shadow-sm">
                            <div className="mb-4">
                                <h1 className="text-center">Denty Dentist</h1>
                                <h5 className="text-center">Account Information</h5>
                            </div>
                            <List bordered={true} hover={true} size="lg">
                                <List.Item>
                                    <Link to="/edit-profile">
                                        Edit Profile
                                    </Link>
                                </List.Item>

                                <List.Item>
                                    <Link to="/change-password">
                                        Change Password
                                    </Link>
                                </List.Item>

                                <List.Item>
                                    <Button block={true} color="orange" size="lg" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </List.Item>

                                <List.Item>
                                    <Link to="/deactivate-account">
                                        Deactivate Account
                                    </Link>
                                </List.Item>

                                <List.Item>
                                    <Link to="/delete-account">
                                        Delete Account
                                    </Link>
                                </List.Item>
                            </List>
                        </Panel>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default AccountPage;
