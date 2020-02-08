import React from "react";
import {List} from "rsuite";

function DentistListItem(props) {
    return (
        <List.Item>
            <div style={{
                display: "flex"
            }}>
                <img
                    src={props.article.image}
                    className="rounded-circle"
                    title="User profile image"
                    alt={`Profile picture of ${props.article.title}`}
                />
                <div>
                    <p>{new Date(props.article.published_date).toDateString()}</p>
                    <p>{props.article.author.name}</p>
                    <p>
                        {props.article.caption}
                    </p>
                </div>
            </div>
        </List.Item>
    )
}

export default DentistListItem;
