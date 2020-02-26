import React, {useState} from "react";
import {Card, Container, Form} from "react-bootstrap"
import Layout from "../../components/layout/Layout";
import {Button, DatePicker, Panel} from "rsuite";
import axios from "axios";

import {useHistory} from "react-router-dom";

function CreatePage(props) {

    const history = useHistory();

    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);
    const [appointment, setAppointment] = useState({});
    const [appointmentDate, setAppointmentDate] = useState("");

    function handleAppointmentChange(event) {
        setAppointment({...appointment, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        axios({
            method: "post",
            url: `http://localhost:5000/api/v1/appointments`,
            data: {
                appointment_date: appointmentDate,
                ...appointment,
                patient: userID
            },
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setLoading(false);
            console.log(response.data.article)
        }).catch(function (error) {
            setLoading(false);
            console.log(error);
        });
    }


    function handleAppointmentDatePick(date, event) {
        setAppointmentDate(date);
    }

    return (
        <Layout>
            {
                (!userID) ? (
                    history.push("/login")
                ) : (

                    <div style={{
                        backgroundColor: "#ddd",
                        display: "flex",
                        minHeight: "100vh",
                        justifyContent: "center",
                        alignItems: "flex-start"
                    }} className="py-5">
                        <Container>
                            <Panel style={{borderRadius: "24px", backgroundColor: "white"}}
                                   className="shadow-sm py-5 p-2">
                                <h4 className="text-center">New Appointment</h4>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                className="rounded-pill"
                                                type="text"
                                                placeholder="Enter Title"
                                                required
                                                name="title"
                                                onChange={handleAppointmentChange}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                type="text"
                                                className="rounded-pill"
                                                placeholder="Enter Description"
                                                required
                                                name="description"
                                                onChange={handleAppointmentChange}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label htmlFor="appointment-date">Appointment Date</Form.Label>
                                            <DatePicker
                                                block={true}
                                                className="rounded-pill"
                                                name="appointment-date"
                                                placeholder="Select Appointment Date"
                                                id="appointment-date"
                                                required
                                                onOk={handleAppointmentDatePick}
                                            />
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
                                                Create Appointment
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Panel>
                        </Container>
                    </div>
                )
            }
        </Layout>
    )
}

export default CreatePage;
