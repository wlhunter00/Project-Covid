import React from "react";
import Button from "../elements/button";
import {connect} from "react-redux";
import {emailAddressCheck} from "../utilities/methods";
import axios from "axios";
import {API_ROUTE} from "../utilities/api";

class Notification extends React.Component {
    constructor(props){
        super(props);
        this.state = {title:"", body:"", successMessage:""};
        this.handleChange = this.handleChange.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
        
    }   

    handleChange(e){
        if(this.state.successMessage){
            this.setState({successMessage:""});
        }
        let inputDataName = e.target.dataset.name;
        let inputData = e.target.value;
        this.setState({[inputDataName]:inputData});
    }

    sendNotification(e){
        e.preventDefault();
        if(!this.props.authenticated){
            alert("You have not been authenticated");
        }
        (async () => {
            try{
                let response = await axios.post(`${API_ROUTE}/notifications/notification/`,{
                    title: this.state.title,
                    body: this.state.body,
                });
                if(!response.data.success){
                    this.setState({failureMessage:response.data.message})
                    return false;
                }
                this.setState({title:"", body:"", successMessage:response.data.message});
            } catch(err){
                return false;
            }
        })();
    }

    render() {
        return (
            <React.Fragment>
                <section className="section">
                    <form onSubmit={this.sendNotification} className="form box-shadow">
                        <div>
                            <p className="bold"> Push notification form </p>
                            <p className="message message--success"> {this.state.successMessage} </p>
                            <p className="message message--error"> {this.state.failureMessage} </p>
                        </div>
                        <div>
                            <label>
                                <p> Notification title </p>
                                <input onChange={this.handleChange} data-name="title" className="text-input" type="text" value={this.state.title} />
                            </label>
                        </div>
                        <div>
                            <label>
                                <p> Notification body </p>
                                <textarea onChange={this.handleChange} data-name="body" className="text-input text--big" type="text" value={this.state.body} >
                                </textarea>
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
        authenticated: state.auth
    }
}

export default connect(mapStateToProps)(Notification);
