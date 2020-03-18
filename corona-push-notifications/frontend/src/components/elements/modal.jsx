
import React from "react";
import Button from "./button";
class Modal extends React.Component{

    constructor(props){
        super(props);
        this.state = { display:false}
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.setState({display:this.props.display});
    }

    static defaultProps = {
        title: (<p>Modal Title that would show the title of the content herein</p>),
        body: "Modal body",
        footer: "Modal footer"
    }

    handleClick(e){
        if(e.target.dataset.toggle === "modal"){
            this.setState({display:false});
            this.props.closeModal();
        }
    }

    render(){
         return (
            <div data-toggle="modal" onClick={this.handleClick} className={"modal "+ (this.state.display ? "show" : "hide") } style={{width:"100%", overflow:"scroll", padding:"23px", height:"100vh", position:"fixed", top:"0", left:"0", zIndex:1000, boxSizing:"border-box", background:"rgba(241,241,241,0.9)"}}>
                <div className="modal__content" role="document" style={{maxWidth:"80%", margin:"auto", background:"white", opacity:1, padding:"11px"}}>
                    <div className="modal__header" style={{display:"flex", justifyContent:"space-between"}}>
                        <div className="modal__title">
                            {this.props.title}
                        </div>
                        <Button data-toggle="modal" handleClick={this.handleClick} className="button--close" > X </Button>
                    </div>
                    <div className="modal__body">
                        {this.props.body}
                    </div>
                    <div className="modal__footer">
                        {this.props.footer}
                    </div>
                </div>
            </div>
        );
    }
}



export default Modal
