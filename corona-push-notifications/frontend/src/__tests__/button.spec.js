import React from "react";
import { create } from "react-test-renderer";



class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {text: ""};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState({text:"PROCEED TO CHECKOUT"});
	}

	render(){
		return (
			<button onClick={this.handleClick}>
				{this.state.text || this.props.text}
			</button>
		)
	}
}

describe("Button component", () => {
  /*test("Matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });*/

  test("It shows the expected test when clicked", () => {
  	const component = create(<Button text="SUBSCRIBE TO BASIC" />);
  	const instance = component.root;
  	const button = instance.findByType("button");
  	button.props.onClick();
  	expect(button.props.children).toBe("PROCEED TO CHECKOUT");
  });

});