import { combineReducers } from 'redux';
import {user} from './userReducer';
import storiesReducer, {search, comments} from './storiesReducer';
import asyncReducer from './asyncReducer';

const rootReducer = combineReducers({
	user,
    stories: storiesReducer,
    search,
    comments,
    async: asyncReducer
});

export default rootReducer;