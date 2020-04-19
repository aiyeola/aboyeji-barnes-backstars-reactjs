import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './redux/store';
import './styles/App.scss';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PageNotFound from './components/PageNotFound';
import ServerErrorPage from './components/500page';
import CallForVerify from './components/CallForVerify';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ToastContainer />
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signUp" component={SignUpPage} />
          <Route path="/call4verify" component={CallForVerify} />
          <Route path="/404" component={PageNotFound} />
          <Route path="/500" component={ServerErrorPage} />
        </Switch>
      </Router>
    </div>
  </Provider>
);

export default App;
