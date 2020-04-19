import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

it('render without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});
