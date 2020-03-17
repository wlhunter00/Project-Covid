
import React from "react";

import Header from "./static/header";
import Signin from "./forms/signin"
import {API_ROUTE} from "./utilities/api";
import axios from "axios";
import {connect} from "react-redux";


class Home extends React.Component {
    
    render() {
        
        return (
            <React.Fragment>
                <Header />
                <Signin />
            </React.Fragment>
        )
    }
}


export default connect()(Home);
