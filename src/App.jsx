import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './redux/store';
import './styles/App.scss';
import Authorization from './components/shared/Authorization';
import PrivateRoute from './PrivateRoute.js';
import AccessForbiddenPage from './components/AccessForbiddenPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CallForVerify from './components/CallForVerify';
import ServerErrorPage from './components/500page';
import VerifyEmailPage from './components/VerifyEmailPage';
import ReverifyPage from './components/ReverifyPage';
import ResetPasswordPage from './components/ResetPassword/ResetPasswordPage';
import ManageDashboard from './components/Dashboard';
import UserRolePage from './components/UserRolePage';
import AllAccommodations from './components/Accommodation';
import Accommodation from './components/Accommodation/OneAccommodation';
import Profile from './components/Profile';
import Requests from './components/Requests';
import SingleRequest from './components/Requests/SingleRequest';
import ApprovalsPage from './components/Requests/ApprovalsPage';
import ApproveReject from './components/Requests/ApproveReject';
import LoaderSpinner from './components/shared/LoaderSpinner';

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
  <Suspense fallback={<LoaderSpinner />}>
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
            <Route
              exact
              path="/forgot-password"
              component={ResetPasswordPage}
            />
            <Route
              path="/reset-password/:userId/:userToken"
              component={ResetPasswordPage}
            />
            <PrivateRoute
              path="/access-forbidden"
              component={AccessForbiddenPage}
            />
            <PrivateRoute path="/500" component={ServerErrorPage} />
            <Route path="/dashboard" component={ManageDashboard} />
            <Route path="/accommodations" component={AllAccommodations} />
            <Route path="/accommodation/:id" component={Accommodation} />
            <Route path="/profile" component={Profile} />
            <Route path="/requests" component={Requests} />
            <Route path="/request/:id" component={SingleRequest} />
            <Route path="/approvals" component={ApprovalsPage} />
            <Route path="/approvals/:id" component={ApproveReject} />
            <Route path="/settings" component={UserRolePage} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </div>
    </Provider>
  </Suspense>
);

export default App;

//  <PrivateRoute path="/dashboard" component={User(ManageDashboard)} />
//             <PrivateRoute path="/accommodations" component={All(AllAccommodations)}/>
//             <PrivateRoute path="/accommodation/:id" component={All(Accommodation)} />
//             <PrivateRoute path="/profile" component={All(Profile)} />
//             <PrivateRoute path="/requests" component={User(Requests)} />
//             <PrivateRoute path="/request/:id" component={User(SingleRequest)} />
//             <PrivateRoute path="/approvals" component={Manager(ApprovalsPage)} />
//             <PrivateRoute path="/approvals/:id" component={Manager(ApproveReject)} />
//             <PrivateRoute path="/settings" component={Admin(UserRolePage)} />
