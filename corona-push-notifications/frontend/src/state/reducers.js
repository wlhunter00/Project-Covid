import * as actions from "./actions.js";

let user = localStorage.getItem("user");
user = user ? user : Date.now().toString(16); 

let initialState = {
	user : user,
	news : [],
	hash : Date.now().toString(16),
	activePreview : {
		title:"",
		body:"",
		title:"",
		footer:"",
	}
}

function reducer(providedState, action) {
	let state = providedState || initialState;
	switch(action.type){
	
		case actions.SET_NEWS:
			return {
				...state,
				hash : action.payload.hash,
				news : action.payload.news,
			}

		case actions.SET_ACTIVE_PREVIEW:
			let activePreview = {}
			console.log(state.news);
			for(let i = 0; i < state.news.length; i++){
				if(state.news[i]['_id'] == action.payload.id){
					activePreview = state.news[i];
					break;
				}
			}
			return {
				...state,
				hash : action.payload.hash,
				activePreview : activePreview,
			}

		default:
			return state;
	}
}

export default reducer;