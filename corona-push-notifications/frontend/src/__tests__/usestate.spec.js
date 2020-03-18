import React, {useState} from "react";
import { create, act } from "react-test-renderer";



function Button(props){
	let [text, setText] = useState("");
	function handleClick(){
		setText("PROCEED TO CHECKOUT");
	}

	return (<button onClick={handleClick}>{text || props.text}</button>);
}

describe("Button component", () => {
  /*test("Matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });*/

  test("It shows the expected test when clicked", () => {
  	let component;
  	act(() => {
  		component = create(<Button text="SUBSCRIBE TO BASIC" />);
  	}); 
  	const instance = component.root;
  	const button = instance.findByType("button");
  	act(() => button.props.onClick());
  	expect(button.props.children).toBe("PROCEED TO CHECKOUT");
  });

});