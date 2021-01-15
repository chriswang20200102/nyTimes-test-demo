

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getNewsList } from './newsActions';

import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH
} from './asyncActions';


describe('asyncActions', () => {
  it('should asyncActions actions to start', () => {
    const store = configureStore([thunk])({
      stories: {}
    });
    store.dispatch(getNewsList('home')).then(() => {
              const actions = store.getActions();
              expect(actions).toEqual([
                  { type: ASYNC_ACTION_START, payload: null },
                  { type: ASYNC_ACTION_FINISH, payload: null }]
              );
        });
    });
});
