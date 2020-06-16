import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import BarnesBackstarsLogo from '../../assets/Barnes (2).jpg';

const LoaderSpinner = () => (
  <div className="spinner-container">
    <img
      src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
      className="logo"
      alt="Barnes Backstars Logo"
    />
    <Loader type="ThreeDots" color="#00A1EC" height={80} width={80} />
  </div>
);

export default LoaderSpinner;
