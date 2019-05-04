import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Talks from './Talks';
import MyTalks from './MyTalks';
import Talk from './Talk';
import NewTalk from './NewTalk';
import NotFound from './NotFound';
import {getCookie} from './utils';

const AppRouter = () => {
  const [userSession, setUserSession] = useState({
    isLogged: false,
    token: null,
  });
  useEffect(() => {
    const userToken = getCookie('token');
    if (userToken) {
      setUserSession({
        isLogged: true,
        token: userToken,
      });
    }
  });

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              {...props}
              isLogged={userSession.isLogged}
              userToken={userSession.token}
            />
          )}
        />
        <Route path="/login" component={Login} />
        <Route
          path="/talks"
          render={(props) => (
            <Talks
              {...props}
              isLogged={userSession.isLogged}
              userToken={userSession.token}
            />
          )}
        />
        <Route
          path="/new"
          render={(props) => (
            <NewTalk
              {...props}
              isLogged={userSession.isLogged}
              userToken={userSession.token}
            />
          )}
        />
        <Route
          path="/my-talks"
          render={(props) => (
            <MyTalks
              {...props}
              isLogged={userSession.isLogged}
              userToken={userSession.token}
            />
          )}
        />
        <Route
          path="/t/:id"
          render={(props) => (
            <Talk
              {...props}
              isLogged={userSession.isLogged}
              userToken={userSession.token}
            />
          )}
        />
        {/* when none of the above match, <NoMatch> will be rendered */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
