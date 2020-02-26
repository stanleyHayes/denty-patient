import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/Layout";
import {Container} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

import axios from "axios";
import {Divider, List, Panel, Button} from "rsuite";

function AccountPage(props) {

    const history = useHistory();

    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState({});

    useEffect(function () {
        axios({
            method: "get",
            url: `http://localhost:5000/api/v1/users/${userID}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setUser(response.data.user);
        }).catch(function (error) {
            console.log(error);
        });
    });

    function handleLogout(event) {
        axios({
            method: "post",
            url: `http://localhost:5050/api/v1/users/${userID}/logout`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setUser(response.data.user);
            localStorage.clear();
            history.push("/login");
        }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <Layout>
            {
                (!userID) ? (
                    history.push("/login")
                ) : (
                    <div style={{backgroundColor: "whitesmoke"}}>
                        <Container>
                            {
                                (user) ? (
                                    <div className="py-4">
                                        <Panel
                                            bordered={true}
                                            className="py-2 p-xs-2 p-sm-2 p-lg-5 shadow-sm"
                                            style={{
                                                backgroundColor: "white", borderRadius: "24px"
                                            }}>
                                            <List bordered={true} hover={true} size="md">
                                                <List.Item>
                                                    <small>Name</small>
                                                    <h6>{user.name}</h6>
                                                </List.Item>

                                                <List.Item>
                                                    <small>Email</small>
                                                    <h6>{user.email}</h6>
                                                </List.Item>

                                                <List.Item>
                                                    <small>Contact</small>
                                                    <h6>{user.phone}</h6>
                                                </List.Item>
                                            </List>
                                        </Panel>

                                        <Divider>Account Information</Divider>
                                        <Panel bordered={false}
                                               className="py-5 p-sm-2 p-lg-5  shadow-sm"
                                               style={{
                                                   backgroundColor: "white", borderRadius: "24px"
                                               }}>


                                            <Button block={true} size="sm" appearance="primary">
                                                <Link to="/edit-profile" className="text-white">
                                                    Edit Profile
                                                </Link>
                                            </Button>

                                            <Divider/>

                                            <Button block={true} size="sm" appearance="primary"
                                                    href="/change-password">
                                                <Link to="/change-password" className="text-white">
                                                    Change Password
                                                </Link>
                                            </Button>

                                            <Divider/>

                                            <Button
                                                appearance="primary"
                                                block={true}
                                                size="sm"
                                                onClick={handleLogout}
                                                className="text-white">Logout</Button>

                                            <Divider/>
                                            <Button color="red" block={true} size="sm">
                                                <Link to="/delete-account" className="text-white">Delete Account</Link>
                                            </Button>

                                            <Divider/>

                                            <Button color="orange" block={true} size="sm">
                                                <Link to="/deactivate-account" className="text-white">De-activate
                                                    Account</Link>
                                            </Button>

                                        </Panel>
                                    </div>
                                ) : (
                                    <h3>Loading</h3>
                                )
                            }
                        </Container>
                    </div>
                )
            }
        </Layout>
    )
}

export default AccountPage;
