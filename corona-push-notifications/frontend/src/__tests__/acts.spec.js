import React, {useState} from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

function Button(props){
	let [text, setText] = useState("");
	function handleClick(){
		setText("PROCEED TO CHECKOUT");
	}

	return (<button onClick={handleClick}>{text || props.text}</button>);
}

describe("Button component", () => {
	test("it shows the expected text when clicked", () => {
		act(() => {
			ReactDOM.render(<Button text="SUBSCRIBE TO BASIC" />, container);
		});
		const button = container.getElementsByTagName("button")[0];
		expect(button.textContent).toBe("SUBSCRIBE TO BASIC");
		button.click();
		expect(button.textContent).toBe("PROCEED TO CHECKOUT");
		
	});
	
})