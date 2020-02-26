import React, {useEffect, useState} from "react";
import {Col, Grid, List, Row} from "rsuite";
import Layout from "../../components/layout/Layout";
import RecordPage from "./RecordPage";
import axios from "axios";
import RecordListItem from "./RecordListItem";
import {useHistory} from "react-router-dom";


function RecordsPage(props) {

    const history = useHistory();

    const [records, setRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    function handleSelectedRecord(record) {
        setSelectedRecord(record);
    }


    useEffect(function () {
        axios({
            url: `http://localhost:5000/api/v1/records?patient=${userID}`,
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setRecords(response.data.records);
        }).catch(function (error) {
            console.log(error);
        });
    }, [records, token, userID]);

    return (
        <Layout>
            {
                (!userID) ? (
                    history.push("/login")
                ) : (

                    <Grid fluid={true}>
                        <Row>
                            <Col lg={8} md={8} sm={24}>
                                <Row>
                                    {
                                        (records.length === 0) ? (
                                            <Col style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minHeight: "93vh",
                                                backgroundColor: "whitesmoke"
                                            }}>
                                                <h5 style={{color: "#999"}}>No Records</h5>
                                            </Col>
                                        ) : (
                                            <Col className="mb-4" xs={24}>
                                                <List hover={true} bordered={true} size="lg">
                                                    {
                                                        records.map(function (record) {
                                                            return (
                                                                <RecordListItem
                                                                    record={record}
                                                                    handleSelectedRecord={handleSelectedRecord}/>
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
                                        (!selectedRecord) ? (
                                            <Col style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minHeight: "93vh"
                                            }}>
                                                <h5 style={{color: "#999"}}>No Record Selected</h5>
                                            </Col>
                                        ) : (
                                            <Col>
                                                <RecordPage record={selectedRecord}/>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                )
            }
        </Layout>
    )
}

export default RecordsPage;
