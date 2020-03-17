
import React from "react";
import NavigationMenu from "./navigationmenu";
import SearchBar from "./searchbar";
import {connect} from "react-redux";
import axios from "axios";
import {API_ROUTE} from "../utilities/api";
class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = { }
    }

    selectTab(e){
        e.persist();
        this.setState({activeTab:e.target.dataset.tabname});
        this.searchNews(e);
    }

    showMenu(e){
        this.setState({showMenu: !this.state.showMenu});
    }

    dispatchStateChange(data){
        this.props.dispatch({
            type: "SET_NEWS",
            payload: {hash: Date.now().toString(16), news: data},
        });
    }

    searchNews(e){
        ( async () => {
            try{
                let response = await axios.get(`${API_ROUTE}/search`,{
                    params : {query:e.target.dataset.tabname},
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
                <nav style={{width:"100%", maxWidth:"100%", background:"white", height:"50px", justifyContent:"space-between", display:"flex"}}>
                    <div onClickCapture={this.showMenu} style={{display:"flex", cursor:"pointer", margin:"11px", flexDirection:"column"}}>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <span style={{background:"black", width:"10px",height:"10px", margin:"2px"}}> </span>
                            <span style={{background:"black", width:"10px",height:"10px", margin:"2px"}}> </span>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <span style={{background:"black", width:"10px",height:"10px", margin:"2px"}}> </span>
                            <span style={{background:"black", width:"10px",height:"10px", margin:"2px"}}> </span>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}



export default connect()(Header);
