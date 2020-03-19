
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

    render(){
         return (
            <>
                <nav style={{width:"100%", maxWidth:"100%", background:"white", height:"50px", justifyContent:"space-between", display:"flex"}}>
                    <div  style={{display:"flex", cursor:"pointer", margin:"11px", flexDirection:"column"}}>
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
