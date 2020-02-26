import React from "react";
import {Divider, Panel} from "rsuite";

function DentistItem(props) {

    const styles = {
        name: {},
        contact: {},
        secondary: {},
    };

    return (
        <Panel bordered={true} shaded={true} className="shadow-sm">
            <small>Name</small>
            <p>{props.dentist.name}</p>
            <Divider/>

            <small>Email</small>
            <p>{props.dentist.email}</p>
            <Divider/>

            <small>Contact</small>
            <p>{props.dentist.phone}</p>
            <Divider/>


            <small>Cases</small>
            <p>{props.dentist.records.length}</p>

            <small>Articles</small>
            <p>{props.dentist.articles.length} Published</p>
        </Panel>
    )
}

export default DentistItem;
