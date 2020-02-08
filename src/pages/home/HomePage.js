import React, {useEffect, useState} from "react";
import {Col, Divider, Panel, Row} from "rsuite"
import Layout from "../../components/layout/Layout";
import AppointmentItem from "../appointment/AppointmentItem";
import ArticleItem from "../article/ArticleItem";
import {Container} from "react-bootstrap";
import axios from "axios";
import Record from "../record/Record";

function HomePage(props) {

    const [articles, setArticles] = useState([]);
    const [assignedAppointments, setAssignedAppointments] = useState([]);
    const [unassignedAppointments, setUnassignedAppointments] = useState([]);
    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [records, setRecords] = useState([]);


    useEffect(function () {
        axios({
            url: `http://localhost:5000/api/v1/articles?author=${userID}`,
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setArticles(response.data.articles);
        }).catch(function (error) {
            console.log(error);
        });
    }, [articles]);


    useEffect(function () {
        axios({
            url: "http://localhost:5000/api/v1/appointments?status=vacant",
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setUnassignedAppointments(response.data.appointments);
        }).catch(function (error) {
            console.log(error);
        });
    }, [unassignedAppointments]);

    useEffect(function () {
        axios({
            url: `http://localhost:5000/api/v1/appointments?status=vacant&dentist=${userID}`,
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setAssignedAppointments(response.data.appointments);
        }).catch(function (error) {
            console.log(error);
        });
    }, [assignedAppointments]);

    useEffect(function () {
        axios({
            url: `http://localhost:5000/api/v1/records?dentist=${userID}`,
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setRecords(response.data.records);
        }).catch(function (error) {
            console.log(error);
        });
    }, [records]);

    return (
        <Layout>
            <div style={{backgroundColor: "#ddd"}}>
                <Container>
                    <Row className="py-5">
                        <Col xs={24}>
                            <h3 className="text-center">Summary</h3>
                        </Col>
                        <Col xs={20} sm={20} md={10} lg={10} xsOffset={2} smOffset={2} mdOffset={1} lgOffset={1}
                             className="my-2">
                            <Panel bordered={true} shaded={false} className="shadow-sm"
                                   style={{backgroundColor: "white"}}>
                                <h1 className="text-center text-info">{assignedAppointments.length}</h1>
                                <h5 className="text-center text-dark ">Appointments</h5>
                            </Panel>
                        </Col>

                        <Col xs={20} sm={20} md={10} lg={10} xsOffset={2} smOffset={2} mdOffset={1} lgOffset={1}
                             className="my-2">
                            <Panel bordered={true} shaded={false} className="shadow-sm"
                                   style={{backgroundColor: "white"}}>
                                <h1 className="text-center text-info">{unassignedAppointments.length}</h1>
                                <h5 className="text-center text-dark">Unassigned Appointments</h5>
                            </Panel>
                        </Col>

                        <Col xs={20} sm={20} md={10} lg={10} xsOffset={2} smOffset={2} mdOffset={1} lgOffset={1}
                             className="my-2">
                            <Panel bordered={true} shaded={false} className="shadow-sm"
                                   style={{backgroundColor: "white"}}>
                                <h1 className="text-center text-info">{articles.length}</h1>
                                <h5 className="text-center text-dark">Articles</h5>
                            </Panel>
                        </Col>

                        <Col xs={20} sm={20} md={10} lg={10} xsOffset={2} smOffset={2} mdOffset={1} lgOffset={1}
                             className="my-2">
                            <Panel bordered={true} shaded={false} className="shadow-sm"
                                   style={{backgroundColor: "white"}}>
                                <h1 className="text-center text-info">{records.length}</h1>
                                <h5 className="text-center text-dark">Records</h5>
                            </Panel>
                        </Col>
                    </Row>

                    <Divider>Unassigned Appointments</Divider>

                    <Row className="my-2">
                        {
                            (unassignedAppointments.length <= 0) ? (
                                    <Col style={{
                                        minHeight: "85vh",
                                        backgroundColor: "whitesmoke",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        justify: "center"
                                    }}>
                                        <h5 style={{color: "#999"}}>No Vacant Appointments</h5>
                                    </Col>
                                ) :
                                (
                                    unassignedAppointments.map(function (appointment, index) {
                                        return (
                                            <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                                <AppointmentItem appointment={appointment}/>
                                            </Col>
                                        )
                                    })
                                )
                        }
                    </Row>


                    <Divider>Articles</Divider>

                    <Row className="my-2">
                        {
                            (articles.length <= 0) ? (
                                    <Col style={{
                                        minHeight: "85vh",
                                        backgroundColor: "whitesmoke",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        justify: "center"
                                    }}>
                                        <h5 style={{color: "#999"}}>No Authored Articles</h5>
                                    </Col>
                                ) :
                                (
                                    articles.map(function (article, index) {
                                        return (
                                            <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                                <ArticleItem article={article}/>
                                            </Col>
                                        )
                                    })
                                )
                        }
                    </Row>

                    <Divider>Appointments</Divider>

                    <Row className="my-2">
                        {
                            (assignedAppointments.length <= 0) ? (
                                    <Col style={{
                                        minHeight: "85vh",
                                        backgroundColor: "whitesmoke",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        justify: "center"
                                    }}>
                                        <h5 style={{color: "#999"}}>No Assigned Appointments</h5>
                                    </Col>
                                ) :
                                (
                                    assignedAppointments.map(function (appointment, index) {
                                        return (
                                            <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                                <AppointmentItem appointment={appointment}/>
                                            </Col>
                                        )
                                    })
                                )
                        }
                    </Row>

                    <Divider>Records</Divider>

                    <Row className="my-2">
                        {
                            (records.length <= 0) ? (
                                    <Col style={{
                                        minHeight: "85vh",
                                        backgroundColor: "whitesmoke",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        justify: "center"
                                    }}>
                                        <h5 style={{color: "#999"}}>No Records</h5>
                                    </Col>
                                ) :
                                (
                                    records.map(function (record, index) {
                                        return (
                                            <Col className="my-2" xs={24} md={12} lg={8} key={index}>
                                                <Record record={record}/>
                                            </Col>
                                        )
                                    })
                                )
                        }
                    </Row>

                </Container>
            </div>
        </Layout>
    )
}

export default HomePage;
