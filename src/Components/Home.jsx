import React, { Component } from 'react';
import News from './News';

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* Display general news on Home page */}
        <News
          apiUrl="https://newsapi.org/v2/top-headlines?country=us&apiKey=f6943d3d905d48bdb7889b5680e52469"
          loadingBar={this.props.loadingBar}
        />
      </div>
    );
  }
}

