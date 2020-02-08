import React, {useState} from "react";
import {Col, Container, Divider, Panel, Row} from "rsuite"
import Layout from "../../components/layout/Layout";
import ArticleItem from "../article/ArticleItem";

function DentistPage(props) {

    return (
        <Layout>

            <div style={{backgroundColor: "whitesmoke"}}>
                <Container>
                    <Panel bordered={true} style={{backgroundColor: "white", borderRadius: "8px"}}>

                    </Panel>

                    <Divider>Articles</Divider>
                    <Row>
                        {
                            (props.dentist.articles.length === 0) ? (
                                <Col
                                    xs={24}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                    <h6>No Articles Published</h6>
                                </Col>
                            ) : (
                                props.dentist.articles.map(function (article, index) {
                                    return (
                                        <Col xs={24} sm={24} md={12} lg={8} key={index}>
                                            <ArticleItem article={article}/>
                                        </Col>
                                    )
                                })
                            )
                        }
                    </Row>
                    <Divider>Records</Divider>
                </Container>
            </div>
        </Layout>
    )
}

export default DentistPage;
