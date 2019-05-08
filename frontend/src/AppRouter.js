import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Talks from './Talks';
import MyTalks from './MyTalks';
import Talk from './Talk';
import NewTalk from './NewTalk';
import NotFound from './NotFound';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/talks" component={Talks} />
        <Route path="/new" component={NewTalk} />
        <Route path="/my-talks" component={MyTalks} />
        <Route path="/t/:id" component={Talk} />
        {/* when none of the above match, <NotFound> will be rendered */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
