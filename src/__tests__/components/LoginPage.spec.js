import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginPage from '../../components/LoginPage';

describe('Login Page', () => {
  it('Should render without crashing', () => {
    const wrapper = shallow(<LoginPage />);
    console.log('wrapper: ', wrapper);
  });
  const wrapper = mount(<LoginPage />);
  console.log('mount: ', wrapper);
});
