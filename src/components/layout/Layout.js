import React from "react";
import NavigationBar from "../navigation/NavigationBar";

function Layout(props) {
    return (
        <div>
            <div>
                <NavigationBar/>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;