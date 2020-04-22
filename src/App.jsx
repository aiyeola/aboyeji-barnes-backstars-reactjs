import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './redux/store';
import './styles/App.scss';
import PrivateRoute from './PrivateRoute.js';
import Spinner from './components/shared/Spinner';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CallForVerify from './components/CallForVerify';
import ServerErrorPage from './components/500page';
import VerifyEmailPage from './components/VerifyEmailPage';
import ReverifyPage from './components/ReverifyPage';
import ManageDashboard from './components/ManageDashboard';
import Authorization from './components/shared/Authorization.js';

const PageNotFound = lazy(() => import('./components/PageNotFound'));

const store = configureStore();

const Admin = Authorization(['Super Administrator']);
const Manager = Authorization(['Manager', 'Super Administrator']);
const User = Authorization([
  'Requester',
  'Travel Administrator',
  'Manager',
  'Super Administrator'
]);
const All = Authorization([
  'Accommodation Supplier',
  'Requester',
  'Travel Administrator',
  'Manager',
  'Super Administrator'
]);

const App = () => (
  <Suspense fallback={<Spinner />}>
    <Provider store={store}>
      <ToastContainer autoClose={3000} hideProgressBar />
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/log-in" component={LoginPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/call-4-verify" component={CallForVerify} />
            <Route path="/404" component={PageNotFound} />
            <Route path="/verify" component={VerifyEmailPage} />
            <Route path="/reverify" component={ReverifyPage} />
            <Route path="/dashboard" component={ManageDashboard} />
            <Route path="/auth" component={User(Authorization)} />
            <PrivateRoute path="/500" component={ServerErrorPage} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </div>
    </Provider>
  </Suspense>
);

export default App;
