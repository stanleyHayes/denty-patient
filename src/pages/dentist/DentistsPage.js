import React, {useEffect, useState} from "react";
import {Col, Grid, List, Row} from "rsuite";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import DentistListItem from "./DentistListItem";
import DentistPage from "./DentistPage";


function AppointmentsPage(props) {

    const [dentists, setDentists] = useState([]);
    const [selectedDentist, setSelectedDentist] = useState(null);
    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    function handleSelectedDentist(dentist) {
        setSelectedDentist(dentist);
    }


    useEffect(function () {
        axios({
            url: `http://localhost:5000/api/v1/appointments?dentist=${userID}`,
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setDentists(response.data.dentists);
        }).catch(function (error) {
            console.log(error);
        });
    }, [dentists]);

    return (
        <Layout>
            <Grid fluid={true}>
                <Row>
                    <Col lg={8} md={8} sm={24}>
                        <Row>
                            {
                                (dentists.length === 0) ? (
                                    <Col style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: "93vh",
                                        backgroundColor: "whitesmoke"
                                    }}>
                                        <h5 style={{color: "#999"}}>No Dentists</h5>
                                    </Col>
                                ) : (
                                    <Col className="mb-4" xs={24}>
                                        <List hover={true} bordered={true} size="lg">
                                            {
                                                dentists.map(function (dentist) {
                                                    return (
                                                        <DentistListItem
                                                            dentist={dentist}
                                                            handleSelectedDentist={handleSelectedDentist}/>
                                                    )
                                                })
                                            }
                                        </List>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                    <Col lg={15} sm={22} md={14} className="ml-lg-4">
                        <Row>
                            {
                                (!selectedDentist) ? (
                                    <Col style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: "93vh"
                                    }}>
                                        <h5 style={{color: "#999"}}>No Dentist Selected</h5>
                                    </Col>
                                ) : (
                                    <Col>
                                        <DentistPage dentist={selectedDentist}/>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </Layout>
    )
}

export default AppointmentsPage;
