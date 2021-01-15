import {
    REGISTER_DONE, 
    SIGN_IN_DONE,
    SIGN_IN_FAILURE,
    REGISTER_FAILURE,
    REFRESHING_TOKEN_DONE,
    REFRESHING_TOKEN_FAILURE
} from '../actions/userActions'

export const user = (state = {}, action) => {
    switch(action.type) {
        case REGISTER_DONE: 
        case SIGN_IN_DONE:
            return {...state, ...action.payload, error: null}
        case SIGN_IN_FAILURE:
        case REGISTER_FAILURE:
            return {...state, ...action.payload}
        case REFRESHING_TOKEN_DONE:
        case REFRESHING_TOKEN_FAILURE:
            return {...state, ...action.payload}
        default:
            return state;
    }
}