import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchPage from './SearchPage';
import './Styles/RootContainer.css';

class RootContainer extends Component {
  render() {

    return (
      <div className="App">
        <SearchPage />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, null)(RootContainer);
