import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Talks from './Talks';
import MyTalks from './MyTalks';
import Talk from './Talk';
import NewTalk from './NewTalk';
import AddFunds from './AddFunds';
import NewPass from './NewPass';
import NotFound from './NotFound';
import ReactGA from 'react-ga';

const AppRouter = () => {
  ReactGA.initialize('UA-142523459-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/talks" component={Talks} />
        <Route path="/new" component={NewTalk} />
        <Route path="/add-funds" component={AddFunds} />
        <Route path="/update-password" component={NewPass} />
        <Route path="/my-talks" component={MyTalks} />
        <Route path="/t/:id" component={Talk} />
        {/* when none of the above match, <NotFound> will be rendered */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
