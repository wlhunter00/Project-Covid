
import React from "react";
import NavigationMenu from "./navigationmenu";
import axios from "axios";
import {API_ROUTE} from "../utilities/api";
import {connect} from "react-redux";

class SearchBar extends React.Component{

    constructor(props){
        super(props);
        this.state = { query:"", searching:false }
        this.searchNews = this.searchNews.bind(this);
        this.setQuery = this.setQuery.bind(this);
        this.dispatchStateChange = this.dispatchStateChange.bind(this);
    }

    

    setQuery(e){
        this.setState({
            query : e.target.value,
        })
    }

    dispatchStateChange(data){
        this.props.dispatch({
            type: "SET_NEWS",
            payload: {hash: Date.now().toString(16), news: data},
        });
    }

    searchNews(){
        ( async () => {
            try{
                let response = await axios.get(`${API_ROUTE}/search`,{
                    params : {query:this.state.query},
                });
                if(response.data.error){
                    alert("We could not fetch new news at this time.")
                    return;
                }
                return this.setState({searching:true}, () => {
                   console.log("this is the response from search", response.data);
                   this.dispatchStateChange(response.data);

                })
                
            } catch(err){
                this.setState({loading:false});
            }
        })();

    }

    render(){
         return (
            <>
                <div  style={{display:"flex", flexDirection:"row", margin:"11px", cursor:"pointer" }}>
                    <input onChange={this.setQuery} value={this.state.query} placeholder="What are you looking for?" style={{height:"30px", minWidth:"300px", width:"300px", marginRight:"10px"}} className="text-input" />
                    <img onClick={this.searchNews} src="/icons/search.svg" style={{width:"28px", cursor:"pointer"}} />
                </div>
            </>
        );
    }
}



export default connect()(SearchBar);
