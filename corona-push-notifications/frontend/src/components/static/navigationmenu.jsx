import React from 'react';
import Button from "../elements/button";
import SearchBar from "./searchbar";

function NavigationMenu(props){
	return (
		<div className="navigation-menu" style={{width:"100%", height:"100vh", zIndex:"5", position:"fixed", left:"0", top:"0", background:"white"}}>
        	<nav style={{width:"100%", maxWidth:"100%", background:"white", height:"50px", justifyContent:"space-between", display:"flex"}}>
                <div onClickCapture={props.showMenu} style={{display:"flex", cursor:"pointer", margin:"11px", flexDirection:"column"}}>
                    <div style={{display:"flex", width:"28px", flexDirection:"row", justifyContent:"flex-start"}}>
                        <span style={{background:"black", width:"10px",height:"10px", margin:"2px"}}> </span>
                    </div>
                    <div style={{display:"flex", width:"28px", flexDirection:"row", justifyContent:"flex-end"}}>
                        <span style={{background:"black", width:"10px",height:"10px", margin:"2px"}}> </span>
                    </div>
                </div>
                <SearchBar />
            </nav>
        </div>	
	)
}

export default NavigationMenu;