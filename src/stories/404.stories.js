import React from 'react';
import { storiesOf } from '@storybook/react';
import Page404 from '../components/PageNotFound';

export default {
  title: '404 Page',
  component: Page404
};

storiesOf('404', module).add('404page', () => <Page404 />);
