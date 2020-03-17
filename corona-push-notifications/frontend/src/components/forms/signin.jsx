import React from "react";
import Button from "../elements/button";
import {connect} from "react-redux";
import {emailAddressCheck} from "../utilities/methods";
import axios from "axios";
import {API_ROUTE} from "../utilities/api";

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {emailInputed:false, emailErrorMessage:"", passCode:"", email:""}
        this.handleChange = this.handleChange.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }   

    componentDidMount(){
        
    }

    handleSubmit(e){
        e.preventDefault();

    }

    handleChange(e){
        if(this.state.emailErrorMessage){
            this.setState({emailErrorMessage:""});
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
                    alert("please check your email address for your unique passcode")
                    
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
                    <input onChange={this.handleChange} data-name="passcode" className="text-input" type="text" value={this.state.passCode} />
                </label>
                <Button className="button"> Login </Button> 
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
                        </div>
                        {!this.state.emailInputed ? emailView : passCodeView }
                    </form>
                </section>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state){
    return {
    }
}

export default connect(mapStateToProps)(Signin);
