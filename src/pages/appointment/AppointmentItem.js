import React from "react";
import {Divider, Panel} from "rsuite";

function AppointmentItem(props) {

    return (
        <Panel shaded={true} bordered={true}>
            <small>Name</small>
            <p>{props.appointment.patient.name}</p>
            <Divider/>

            <small>Contact</small>
            <p>{props.appointment.patient.phone}</p>
            <Divider/>


            <small>Status</small>
            <p>{props.appointment.status}</p>
            <Divider/>


            <small>Proposed Date</small>
            <p>{props.appointment.appointment_date}</p>
            <Divider/>

            <small>Description</small>
            <p>{props.appointment.description}</p>
        </Panel>
    )
}

export default AppointmentItem;