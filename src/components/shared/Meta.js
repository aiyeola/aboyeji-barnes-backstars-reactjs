import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Meta = ({ title }) => (
  <Helmet>
    <title>{`${title} | Barnes Backstars`}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#00A1EC" />
  </Helmet>
);

Meta.propTypes = {
  title: PropTypes.string.isRequired
};

export default Meta;
