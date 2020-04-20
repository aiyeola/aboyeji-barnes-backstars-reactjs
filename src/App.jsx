import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './redux/store';
import './styles/App.scss';
import Spinner from './components/shared/Spinner';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CallForVerify from './components/CallForVerify';
import ServerErrorPage from './components/500page';

const PageNotFound = lazy(() => import('./components/PageNotFound'));

const store = configureStore();

const App = () => (
  <Suspense fallback={<Spinner />}>
    <Provider store={store}>
      <ToastContainer autoClose={3000} hideProgressBar />
      <div className="App">
        <Router>
          <Switch>
            <Route path="/log-in" component={LoginPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/call-4-verify" component={CallForVerify} />
            <Route path="/404" component={PageNotFound} />
            <Route path="/500" component={ServerErrorPage} />
          </Switch>
        </Router>
      </div>
    </Provider>
  </Suspense>
);

export default App;
