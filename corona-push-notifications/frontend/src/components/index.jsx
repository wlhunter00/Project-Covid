
import React from "react";

import Header from "./static/header";
import Signin from "./forms/signin"
import {API_ROUTE} from "./utilities/api";
import axios from "axios";
import {connect} from "react-redux";


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { news:[]};
        this.dispatchStateChange = this.dispatchStateChange.bind(this);
    }

    componentDidMount(){
        ( async () => {
            try{
                let response = await axios.get(`${API_ROUTE}/news`);
                if(response.data.error){
                    alert("We could not fetch new news at this time.")
                    return;
                }
                return this.setState({news:response.data}, () => {
                   this.dispatchStateChange(response.data);
                })
                
            } catch(err){
                this.setState({loading:false});
            }
        })();

    }

    componentDidUpdate(previousProps, previousState){
        console.log(previousProps.hash, this.props.hash);
        if(previousProps.hash != this.props.hash){
            this.setState({news : this.props.news});
            return true;
        }
    }

    dispatchStateChange(data){
        this.props.dispatch({
            type:"SET_NEWS",
            payload: {hash: Date.now().toString(16), news: data},
        })
    }

    

    render() {
        
        return (
            <React.Fragment>
                <Header />
                <Signin />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state){
    return {
        ...state,
    }
}

export default connect(mapStateToProps)(Home);
