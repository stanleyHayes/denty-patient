import React, {useEffect, useState} from "react";
import {Col, Grid, List, Row} from "rsuite";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import ArticlePage from "./ArticlePage";
import ArticleListItem from "./ArticleListItem";


function ArticlesPage(props) {

    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [userID, setUserID] = useState(localStorage.getItem("user_id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    function handleSelectedArticle(article) {
        setSelectedArticle(article);
    }


    useEffect(function () {
        axios({
            url: `http://localhost:5000/api/v1/articles`,
            method: "get",
            headers: {Authorization: `Bearer ${token}`}
        }).then(function (response) {
            setArticles(response.data.articles);
        }).catch(function (error) {
            console.log(error);
        });
    }, [articles]);

    return (
        <Layout>
            <Grid fluid={true}>
                <Row>
                    <Col lg={8} md={8} sm={24}>
                        <Row>
                            {
                                (articles.length === 0) ? (
                                    <Col style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: "93vh",
                                        backgroundColor: "whitesmoke"
                                    }}>
                                        <h5 style={{color: "#999"}}>No Articles</h5>
                                    </Col>
                                ) : (
                                    <Col className="mb-4" xs={24}>
                                        <List hover={true} bordered={true} size="lg">
                                            {
                                                articles.map(function (article) {
                                                    return (
                                                        <ArticleListItem
                                                            article={article}
                                                            handleSelectedArticle={handleSelectedArticle}/>
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
                                (!selectedArticle) ? (
                                    <Col style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: "93vh"
                                    }}>
                                        <h5 style={{color: "#999"}}>No Article Selected</h5>
                                    </Col>
                                ) : (
                                    <Col>
                                        <ArticlePage article={selectedArticle}/>
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

export default ArticlesPage;
