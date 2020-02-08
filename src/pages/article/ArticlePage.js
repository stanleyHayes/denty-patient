import React from "react";
import {Container, Divider, List, Panel} from "rsuite"
import Layout from "../../components/layout/Layout";

function ArticlePage(props) {
    return (
        <Layout>
            <div style={{backgroundColor: "whitesmoke"}}>
                <Container>
                    <Panel bordered={true} style={{backgroundColor: "white", borderRadius: "8px"}}>
                        <img
                            src={props.article.image}
                            className="img-fluid"
                            alt={`${props.article.title} image`}
                        />
                        <h1>{props.article.title}</h1>
                        <p>{new Date(props.article.published_date).toDateString()}</p>
                        <p>{props.article.caption}</p>
                        <Divider>Causes</Divider>
                        <List bordered={true} hover={true}>
                            {
                                props.article.causes.map(function (cause, index) {
                                    return (
                                        <p key={index}>{cause}</p>
                                    )
                                })
                            }
                        </List>

                        <Divider>Prevention</Divider>
                        <List bordered={true} hover={true}>
                            {
                                props.article.preventions.map(function (prevention, index) {
                                    return (
                                        <p key={index}>{prevention}</p>
                                    )
                                })
                            }
                        </List>

                        <Divider>Symptoms</Divider>
                        <List bordered={true} hover={true}>
                            {
                                props.article.symptoms.map(function (symptom, index) {
                                    return (
                                        <p key={index}>{symptom}</p>
                                    )
                                })
                            }
                        </List>

                        <Divider>Treatments</Divider>
                        <List bordered={true} hover={true}>
                            {
                                props.article.treatments.map(function (treatment, index) {
                                    return (
                                        <p key={index}>{treatment}</p>
                                    )
                                })
                            }
                        </List>

                        <p>By <span>{props.article.author.name}</span></p>
                        <p>Email: {props.article.author.email}</p>
                        <p>Contact: {props.article.author.contact}</p>
                    </Panel>
                </Container>
            </div>
        </Layout>
    )
}

export default ArticlePage;
