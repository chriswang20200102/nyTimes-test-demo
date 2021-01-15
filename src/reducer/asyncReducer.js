export const ASYNC_ACTION_START = "ASYNC_ACTION_START";
export const ASYNC_ACTION_FINISH = "ASYNC_ACTION_FINISH";
export const ASYNC_ACTION_ERROR = "ASYNC_ACTION_ERROR";

const initialState = {
  loading: false,
  asyncMessage: null
}

const AsyncReducer = (state = initialState, action) => {
	switch (action.type) {
		case ASYNC_ACTION_START:
			state = {
				...state, 
				loading: true,
				asyncMessage: action.payload
			}
			break;
		case ASYNC_ACTION_FINISH:
			state = {
				...state, 
				loading: false,
				asyncMessage: null
			}
			break;
		case ASYNC_ACTION_ERROR:
			state = {
				...state, 
				loading: false,
				asyncMessage: action.payload
			}
			break;
		default:
			break;
	}

	return state;
};

export default AsyncReducer;