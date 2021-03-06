import React, {useEffect, useState} from "react";
import {Col, Grid, List, Panel, Row} from "rsuite";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AppointmentItem from "./AppointmentItem";
import {Container, Form} from "react-bootstrap";


function AppointmentsPage(props) {

    const history = useHistory();

    const [appointments, setAppointments] = useState([]);
    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);


    useEffect(function () {
        axios({
            url: `http://localhost:5000/api/v1/appointments?patient=${userID}`,
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setAppointments(response.data.appointments);
        }).catch(function (error) {
            console.log(error);
        });
    }, [appointments, token, userID]);

    return (
        <Layout>
            {
                (!userID) ? (
                    history.push("/login")
                ) : (

                    <div style={{backgroundColor: "#ddd",minHeight: "93vh"}} className="py-5">
                        <Container>
                            <Grid fluid={true}>
                                <Row className="mb-5">
                                    <Col xs={24} sm={24} md={12} mdOffset={6} lg={12} lgOffset={6}>
                                        <Panel className="shadow-sm"
                                               style={{borderRadius: "24px", backgroundColor: "white"}}>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Control as="select">
                                                        <option>All</option>
                                                        <option>Assigned</option>
                                                        <option>Unassigned</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form>
                                        </Panel>
                                    </Col>
                                </Row>

                                <Row className="my-2">
                                    {
                                        (appointments.length <= 0) ? (
                                                <Col style={{
                                                    minHeight: "65vh",
                                                    backgroundColor: "whitesmoke",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    justify: "center"
                                                }}>
                                                    <h5 style={{color: "#999"}}>No Appointments</h5>
                                                </Col>
                                            ) :
                                            (
                                                appointments.map(function (appointment, index) {
                                                    return (
                                                        <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                                            <AppointmentItem appointment={appointment}/>
                                                        </Col>
                                                    )
                                                })
                                            )
                                    }
                                </Row>
                            </Grid>
                        </Container>
                    </div>
                )
            }
        </Layout>
    )
}

export default AppointmentsPage;
