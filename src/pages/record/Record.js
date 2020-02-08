import React from "react";
import {Divider, Panel} from "rsuite";

function Record(props) {
    return (
        <Panel>
            <small>Patient's Name</small>
            <p>{props.record.patient.name}</p>
            <Divider/>

            <small>Patient's Contact</small>
            <p>{props.record.patient.phone}</p>
            <Divider/>

            <small>Information</small>
            <p>{props.record.information}</p>
            <Divider/>

            <small>Next Appointment</small>
            <p>{props.record.next_appointment_date}</p>
        </Panel>
    )
}

export default Record;