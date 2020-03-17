
import React from "react";

class UserNavigation extends React.Component{

    constructor(props){
        super(props);
        this.state = { activeView:"home"}
        this.setView = this.setView.bind(this);
    }

    setView(e){
        this.setState({activeView: e.currentTarget.dataset.viewname})
    }

    render(){
         return (
            <section>
                <div className="user-views" style={{display:"flex", width:"100%", boxSizing:"border-box", maxWidth:"100%", padding:"11px", background:"white", zIndex:"2", position:"fixed", bottom:"0px", left:"0px", flexDirection:"row", justifyContent:"space-between"}}>
                    <div data-viewname="home" onClickCapture={this.setView} className="user-views__option">
                        <svg data-viewname="home" xmlns="http://www.w3.org/2000/svg"  width="20px" height="30px" style={{fill: ((this.state.activeView == 'home') ? 'black' : 'rgb(141,141,141)') }}> 
                            <polyline points="0 10, 10 0, 20 10, 20 30, 0 30, 0 10"  />
                        </svg>
                    </div>
                    <div data-viewname="user" onClickCapture={this.setView} className="user-views__option">
                        <svg data-viewname="user" xmlns="http://www.w3.org/2000/svg"  width="20px" style={{fill:( (this.state.activeView == 'user') ? 'black' : 'rgb(141,141,141)')}} height="30px"> 
                            <g >
                                <circle cx="10" cy="7" r="7"  />
                                <path d="M 0 30 Q 10 0 20 30"  />
                            </g>
                        </svg>
                    </div>
                    <div data-viewname="bookmarks" onClickCapture={this.setView} className="user-views__option">
                        <svg data-viewname="bookmarks" xmlns="http://www.w3.org/2000/svg"  width="20px" height="30px" style={{fill:((this.state.activeView == 'bookmarks') ? 'black' : 'rgb(141,141,141)')}}> 
                            <polyline points="0 30, 10 20, 20 30, 20 0, 0 0, 0 30"  />
                        </svg>
                    </div>
                </div>
            </section>
        );
    }
}



export default UserNavigation
