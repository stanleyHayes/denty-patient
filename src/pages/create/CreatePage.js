import React, {useState} from "react";
import {Card, Container, Form} from "react-bootstrap"
import Layout from "../../components/layout/Layout";
import {Button, Col, Divider, List, Panel, Row} from "rsuite";
import axios from "axios";
import SimpleRemovableItem from "./SimpleRemovableItem";

function CreatePage(props) {

    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const [cause, setCause] = useState("");
    const [causes, setCauses] = useState([]);

    const [treatments, setTreatments] = useState([]);
    const [treatment, setTreatment] = useState("");

    const [prevention, setPrevention] = useState("");
    const [preventions, setPreventions] = useState([]);

    const [symptom, setSymptom] = useState("");
    const [symptoms, setSymptoms] = useState([]);

    const [article, setArticle] = useState({});

    function handleCauseChange(event) {
        setCause(event.target.value);
    }

    function handleCourseAdd() {
        setCauses([...causes, cause]);
    }

    function handleCauseRemove(option) {
        setCauses(causes.filter(function (item) {
                return option !== item
            })
        )
    }


    function handleTreatmentChange(event) {
        setTreatment(event.target.value);
    }

    function handleTreatmentAdd() {
        setTreatments([...treatments, treatment]);
    }

    function handleTreatmentRemove(option) {
        setTreatments(treatments.filter(function (item) {
                return option !== item
            })
        )
    }


    function handleSymptomChange(event) {
        setSymptom(event.target.value);
    }

    function handleSymptomAdd() {
        setSymptoms([...symptoms, symptom]);
    }

    function handleSymptomRemove(option) {
        setSymptoms(symptoms.filter(function (item) {
                return option !== item
            })
        )
    }


    function handlePreventionChange(event) {
        setPrevention(event.target.value);
    }

    function handlePreventionAdd() {
        setPreventions([...preventions, prevention]);
    }

    function handlePreventionRemove(option) {
        setPreventions(preventions.filter(function (item) {
                return option !== item
            })
        )
    }

    function handleArticleChange(event) {
        setArticle({...article, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();

        const _article = {
            ...article,
            author: userID,
            causes: causes,
            treatments: treatments,
            symptoms: symptoms,
            preventions: preventions
        };

        axios({
            method: "post",
            url: `http://localhost:5000/api/v1/articles`,
            data: _article,
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            console.log(response.data.article)
        }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <Layout>
            <div style={{backgroundColor: "#ddd"}} className="py-5">
                <Container>
                    <Panel style={{borderRadius: "8px", backgroundColor: "white"}} className="shadow-sm py-5 p-2">
                        <Card.Img/>
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
                                        onChange={handleArticleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Caption</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        type="text"
                                        className="rounded-pill"
                                        placeholder="Enter Caption"
                                        required
                                        name="caption"
                                        onChange={handleArticleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Causes</Form.Label>
                                    <Form.Control
                                        onChange={handleCauseChange}
                                        className="rounded-pill"
                                        as="textarea"
                                        rows={2}
                                        type="text"
                                        name="cause"
                                        placeholder="Enter Cause"
                                        required
                                    />

                                    <Divider/>

                                    <Button
                                        className="rounded-pill"
                                        block={true}
                                        onClick={handleCourseAdd}
                                        appearance="primary">Add cause</Button>

                                    <Divider>Added Causes</Divider>

                                    <Row>
                                        {
                                            (causes.length === 0) ? (
                                                <Col
                                                    xs={24}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minHeight: "35vh",
                                                        backgroundColor: "whitesmoke"
                                                    }}>
                                                    <h6 style={{color: "#999"}}>No Causes Listed</h6>
                                                </Col>
                                            ) : (
                                                <Col>
                                                    <List bordered={true} hover={true} size="sm">
                                                        {
                                                            causes.map(function (cause, index) {
                                                                return (
                                                                    <SimpleRemovableItem
                                                                        option={cause}
                                                                        key={index}
                                                                        handleOptionRemove={handleCauseRemove}/>
                                                                )
                                                            })
                                                        }
                                                    </List>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Treatments</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        onChange={handleTreatmentChange}
                                        rows={2}
                                        name="treatment"
                                        className="rounded-pill"
                                        type="text"
                                        placeholder="Enter Treatment"
                                        required
                                    />

                                    <Divider/>

                                    <Button
                                        onClick={handleTreatmentAdd}
                                        className="rounded-pill"
                                        block={true}
                                        appearance="primary">Add Treatment</Button>

                                    <Divider>Added Treatments</Divider>

                                    <Row>
                                        {
                                            (treatments.length === 0) ? (
                                                <Col style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    minHeight: "35vh",
                                                    backgroundColor: "whitesmoke"
                                                }}>
                                                    <h6 style={{color: "#999"}}>No Treatments Listed</h6>
                                                </Col>
                                            ) : (
                                                <Col>
                                                    <List bordered={true} hover={true} size="sm">
                                                        {
                                                            treatments.map(function (treatment, index) {
                                                                return (
                                                                    <SimpleRemovableItem
                                                                        handleOptionRemove={handleTreatmentRemove}
                                                                        option={treatment}
                                                                        key={index}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </List>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Symptoms</Form.Label>
                                    <Form.Control
                                        className="rounded-pill"
                                        as="textarea"
                                        rows={2}
                                        type="text"
                                        name="symptom"
                                        onChange={handleSymptomChange}
                                        placeholder="Enter a symptom"
                                        required
                                    />
                                    <Divider/>

                                    <Button
                                        onClick={handleSymptomAdd}
                                        block={true}
                                        className="rounded-pill"
                                        appearance="primary">Add Symptom</Button>

                                    <Divider>Added Symptoms</Divider>

                                    <Row>
                                        {
                                            (symptoms.length === 0) ? (
                                                <Col style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    minHeight: "35vh",
                                                    backgroundColor: "whitesmoke"
                                                }}>
                                                    <h6 style={{color: "#999"}}>No Symptoms Listed</h6>
                                                </Col>
                                            ) : (
                                                <Col>
                                                    <List bordered={true} hover={true} size="sm">
                                                        {
                                                            symptoms.map(function (symptom, index) {
                                                                return (
                                                                    <SimpleRemovableItem
                                                                        key={index}
                                                                        handleOptionRemove={handleSymptomRemove}
                                                                        option={symptom}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </List>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Preventions</Form.Label>
                                    <Form.Control
                                        className="rounded-pill"
                                        as="textarea"
                                        rows={2}
                                        type="text"
                                        name="prevention"
                                        placeholder="Enter a Prevention"
                                        onChange={handlePreventionChange}
                                        required
                                    />
                                    <Divider/>

                                    <Button
                                        onClick={handlePreventionAdd}
                                        block={true}
                                        className="rounded-pill"
                                        appearance="primary">Add Prevention</Button>

                                    <Divider>Added Preventions</Divider>

                                    <Row>
                                        {
                                            (preventions.length === 0) ? (
                                                <Col style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    minHeight: "35vh",
                                                    backgroundColor: "whitesmoke"
                                                }}>
                                                    <h6 style={{color: "#999"}}>No Preventions Listed</h6>
                                                </Col>
                                            ) : (
                                                <Col>
                                                    <List bordered={true} hover={true} size="sm">
                                                        {
                                                            preventions.map(function (prevention, index) {
                                                                return (
                                                                    <SimpleRemovableItem
                                                                        handleOptionRemove={handlePreventionRemove}
                                                                        option={prevention}
                                                                        key={index}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </List>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                </Form.Group>

                                <Form.Group>
                                    <Button
                                        className="rounded-pill"
                                        block={true}
                                        color="green"
                                        size="sm"
                                        onClick={handleSubmit}>
                                        Add Article
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Panel>
                </Container>
            </div>
        </Layout>
    )
}

export default CreatePage;
