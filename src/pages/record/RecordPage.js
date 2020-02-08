import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {Col, Row} from "rsuite";
import Record from "./Record";
import axios from "axios";

function RecordPage(props) {

    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [records, setRecords] = useState([]);

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
        <Container>
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
    )
}

export default RecordPage;
