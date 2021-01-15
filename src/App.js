import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import configureStore from './store/configureStore'
import {getSavedToken} from './util/help'
import {initTokens} from './actions/userActions'
import SignPage from './page/SignPage'
import NewsList from './page/NewsList'
import PageNotFound from './page/PageNotFound'
import Header from './component/Header'
import SearchPage from './page/SearchPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/App.scss'

const App = () => {
  const store = configureStore();
  const token = getSavedToken();
  store.dispatch(initTokens(token));

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={NewsList} />
          <Route path="/section/:category" component={NewsList} />
          <Route path="/search" component={SearchPage} />
          <Route path="/signIn" component={SignPage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
