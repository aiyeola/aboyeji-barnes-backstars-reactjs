import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Meta = (props) => {
  const { title } = props;
  return <Helmet title={`${title} | Barnes Backstars`} />;
};

Meta.propTypes = {
  title: PropTypes.string.isRequired
};

export default Meta;
