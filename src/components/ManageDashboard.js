import React, { Component } from 'react';
import Meta from './shared/Meta';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Meta title="Dashboard" />
        <div>Dashboard</div>
      </div>
    );
  }
}

export default Dashboard;
