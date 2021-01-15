import {updateSavedTokens, getSavedToken} from '../util/help'
import {refreshToken} from '../actions/userActions'
import {
    REFRESHING_TOKEN_DONE,
    REGISTER_DONE, 
    SIGN_IN_DONE
} from '../actions/userActions'



const userMiddleware = ({dispatch, getState}) => next => action => {
    const result = next(action);
    if (typeof action === 'function') {
        if (getSavedToken()?.expiresIn - Date.now() <= 1000 && getSavedToken()?.value) {
            refreshToken(getSavedToken()?.value)
        }
    }

	switch (action.type) {
        case SIGN_IN_DONE:
        case REGISTER_DONE:
        case REFRESHING_TOKEN_DONE:
                updateSavedTokens(action.payload?.access_token);
                tokenRefreshChecker(dispatch, action.payload?.access_token)
                break;
        default:
    }

    return result;
}

const tokenRefreshChecker = (dispatch, access_token) => {
    var interval;
	if (interval) window.clearInterval(interval);
	interval = window.setInterval(() => dispatch(refreshToken(access_token)), 1000 * 60 * 15)
}

export default userMiddleware