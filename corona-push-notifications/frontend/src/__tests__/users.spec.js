import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
let container;


class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState(() => {
          return {data: json};
        });
      });
  }

  render(){
    return (
      <ul>
        {this.state.data.map( user => {
          <li key={user.name}>{user.name}</li>
        })}
      </ul>
    );
  }
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
describe("User component", () => {
  test("it shows a list of users", async () => {
    const fakeResponse = [{ name: "John Doe" }, { name: "Kevin Mitnick" }];
    jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        json: () => Promise.resolve(fakeResponse)
      };
      return Promise.resolve(fetchResponse);
    });
    await act(async () => {
      render(<Users />, container);
    });
    expect(container.textContent).toBe("John DoeKevin Mitnick");
    window.fetch.mockRestore();
  });
});