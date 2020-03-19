import * as actions from "./actions.js";

let user = localStorage.getItem("user");
user = user ? user : Date.now().toString(16); 

let initialState = {
	auth : undefined,
	hash : Date.now().toString(16),
}

function reducer(providedState, action) {
	let state = providedState || initialState;
	switch(action.type){
	
		case actions.AUTH:
			return {
				...state,
				hash :  Date.now().toString(16),
				auth : action.payload,
			}

		default:
			return state;
	}
}

export default reducer;