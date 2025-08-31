import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Navbar from './Components/Navbar';
import News from './Components/News';
import Home from './Components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadingBar = React.createRef(); // replaces useRef
  }

  render() {
    return (
      <Router>
        <Navbar />
        {/* Top Loading Bar */}
        <LoadingBar color="#f11946" ref={this.loadingBar} height={3} />

        <Routes>
          <Route
            path="/"
            element={<Home loadingBar={this.loadingBar} />}
          />
          <Route
            path="/world"
            element={
              <News
                apiUrl="https://newsapi.org/v2/everything?q=world&apiKey=f6943d3d905d48bdb7889b5680e52469"
                loadingBar={this.loadingBar}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                apiUrl="https://newsapi.org/v2/everything?q=Cricket&apiKey=f6943d3d905d48bdb7889b5680e52469"
                loadingBar={this.loadingBar}
              />
            }
          />
          <Route
            path="/bitcoin"
            element={
              <News
                apiUrl="https://newsapi.org/v2/everything?q=bitcoin&apiKey=f6943d3d905d48bdb7889b5680e52469"
                loadingBar={this.loadingBar}
              />
            }
          />
          <Route
            path="/politics"
            element={
              <News
                apiUrl="https://newsapi.org/v2/everything?q=politics&apiKey=f6943d3d905d48bdb7889b5680e52469"
                loadingBar={this.loadingBar}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                apiUrl="https://newsapi.org/v2/everything?q=entertainment&apiKey=f6943d3d905d48bdb7889b5680e52469"
                loadingBar={this.loadingBar}
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                apiUrl="https://newsapi.org/v2/everything?q=business&apiKey=f6943d3d905d48bdb7889b5680e52469"
                loadingBar={this.loadingBar}
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                apiUrl="https://newsapi.org/v2/everything?q=science&apiKey=f6943d3d905d48bdb7889b5680e52469"
                loadingBar={this.loadingBar}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
