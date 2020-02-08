import React from "react";
import {List} from "rsuite";

function RecordItem(props) {
    function handleSelectedRecord() {
        props.handleSelectedRecord(props.record);
    }
    return (
        <List.Item onClick={handleSelectedRecord}>
            <p>{props.record.patient.name}</p>
            <p>{props.record.patient.phone}</p>
            <p>{props.record.next_appointment_date}</p>
        </List.Item>
    )
}

export default RecordItem;