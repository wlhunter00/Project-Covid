import React from "react";
import Button from "../elements/button";
import {connect} from "react-redux";
import {emailAddressCheck} from "../utilities/methods";
import axios from "axios";
import {API_ROUTE} from "../utilities/api";
import { withRouter } from "react-router";

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {emailInputed:false, emailSuccessMessage:"", emailErrorMessage:"", passCodeErrorMessage:"", passCode:"", email:""}
        this.handleChange = this.handleChange.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.submitPassCode = this.submitPassCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dispatchStateChange = this.dispatchStateChange.bind(this);
    }   

    handleSubmit(e){
        e.preventDefault();
    }

    submitPassCode(e){
        (async () => {
            try{
                let response = await axios.post(`${API_ROUTE}/notifications/verify/passcode`,{
                    email:this.state.email.toLowerCase(),
                    passCode: this.state.passCode, 
                });
                if(!response.data.success){
                    this.setState({passCodeErrorMessage:response.data.message});
                    return false;
                }
                console.log("successfully logged you in");
                this.dispatchStateChange(true)
                this.props.history.push("/notification/send");
            } catch(err){
                return false;
            }
        })();
    }

    dispatchStateChange(data){
        this.props.dispatch({
            type:"AUTH",
            payload:data
        })
    }

    handleChange(e){
        if(this.state.emailErrorMessage){
            this.setState({emailErrorMessage:""});
        }
        if(this.state.passCodeErrorMessage){
            this.setState({passCodeErrorMessage:""});
        }
        let inputDataName = e.target.dataset.name;
        let inputData = e.target.value;
        this.setState({[inputDataName]:inputData});
    }

    submitEmail(e){
        let emailValidationResponse = emailAddressCheck(this.state.email.toLowerCase());
        if(emailValidationResponse.isValid){
            ( async () => {
                try{
                    let response = await axios.post(`${API_ROUTE}/notifications/verify/email`,{
                        email:this.state.email.toLowerCase()
                    });
                    console.log(response.data);
                    if(!response.data.success){
                        alert("We could not authenticate you")
                        return false;
                    }
                    this.setState({emailSuccessMessage:response.data.message})
                    
                } catch(err){
                    return false;
                }
            })();
            this.setState({emailInputed:true});
            return true;
        }
        this.setState({emailErrorMessage:emailValidationResponse.message});
        return false;
    }

    render() {
        let passCodeView = (
            <div>
                <label>
                    <p> Pass code </p>
                    <input onChange={this.handleChange} data-name="passCode" className="text-input" type="text" value={this.state.passCode} />
                </label>
                <p className="message message--error"> {this.state.passCodeErrorMessage} </p>
                <Button handleClick={this.submitPassCode} className="button"> Login </Button> 
            </div>
        )
        let emailView = (
            <div>
                <label>
                    <p> Email address </p>
                    <input onChange={this.handleChange} data-name="email" className="text-input" type="email" value={this.state.email} />
                </label>
                <p className="message message--error"> {this.state.emailErrorMessage} </p>
                <Button type="button" handleClick={this.submitEmail} className="button"> Submit </Button> 
            </div>
        )
        return (
            <React.Fragment>
                <section className="section">
                    <form onSubmit={this.handleSubmit} className="form box-shadow">
                        <div>
                            <p className="bold"> Push notification service dashboard login form</p>
                            <p className="message message--success"> {this.state.emailSuccessMessage} </p>
                        </div>
                        {!this.state.emailInputed ? emailView : passCodeView }
                    </form>
                </section>
            </React.Fragment>
        )
    }
}

export default connect()(withRouter(Signin));
