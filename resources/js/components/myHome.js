import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import Back from './Back';
import Index from './Index'

class MyHome extends Component {
  render () {
    return (
      <Router>
        <div className="container">
          This is the Home page <br />
          <Link to="/back">About Page</Link>{' '}<br />
          <Link to="/index">Bot</Link>

          <Switch>
            <Route exact path='/' component={MyHome} />
            <Route exact path='/back' component={Back} />
            <Route exact path='/index' component={Index} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default MyHome;

if (document.getElementById('myHome')) {
    ReactDOM.render(<MyHome />, document.getElementById('myHome'));
}
