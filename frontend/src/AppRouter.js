import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Talks from './Talks';
import MyTalks from './MyTalks';
import Talk from './Talk';
import NotFound from './NotFound';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/talks" component={Talks} />
        <Route path="/my-talks" component={MyTalks} />
        <Route path="/t/:id" component={Talk} />
        {/* when none of the above match, <NoMatch> will be rendered */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
