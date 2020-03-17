
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Header from "./utilities/header";
import Home from "../index";
import Notification from "../forms/notification";
import SignIn from "../forms/signin";


class Navigation extends React.Component {
	
	render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/notification/send" render={() => <Notification />} />
                    <Route exact path="/signin" render={() => <SignIn />} />
                </React.Fragment>
            </Router>
        )
	}
}

export default Navigation;
