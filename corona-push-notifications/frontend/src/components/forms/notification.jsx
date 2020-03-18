import React from "react";
import Button from "../elements/button";
import {connect} from "react-redux";
import {emailAddressCheck} from "../utilities/methods";

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {emailInputed:false, emailErrorMessage:"", passCode:"", email:""}
        this.handleChange = this.handleChange.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
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

    sendNotification(e){
        let emailValidationResponse = emailAddressCheck(this.state.email.toLowerCase());
        if(emailValidationResponse.isValid){
            ( async () => {
                try{
                    let response = await axios.post(`${API_ROUTE}/search`,{
                        email:this.state.email.toLowerCase()
                    });
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
        return (
            <React.Fragment>
                <section className="section">
                    <form onSubmit={this.sendNotification} className="form box-shadow">
                        <div>
                            <label>
                                <p> Notification title </p>
                                <input onChange={this.handleChange} data-name="title" className="text-input" type="email" value={this.state.email} />
                            </label>
                            <label>
                                <p> Notification content </p>
                                <textarea onChange={this.handleChange} data-name="content" className="text-input" type="text" value={this.state.content} >
                                </textarea>
                            </label>
                            <label>
                                <p> Notification image </p>
                                <input onChange={this.handleChange} data-name="image" className="text-input" type="file"  />
                            </label>
                            <Button type="submit" className="button"> Submit </Button> 
                        </div>
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
