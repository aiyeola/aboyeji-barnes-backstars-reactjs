import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from '@testing-library/react';
import { getQueriesForElement } from '@testing-library/dom';
import { LoginPage } from '../../components/LoginPage';

const render = (component) => {
  const root = document.createElement('div');
  ReactDOM.render(component, root);
  return getQueriesForElement;
};

describe('Login Page', () => {
  it('Should render without crashing', () => {
    const { getByText } = render(<LoginPage />);

    getByText('Sign Up Now!');
  });
});
