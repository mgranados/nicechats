import React, {Fragment, useState, useEffect} from 'react';
import './Home.scss';
import {
  Content,
  Section,
  Button,
  Card,
  CardContent,
  Hero,
  HeroHeader,
  Title,
  Container,
  Subtitle,
  MediaContent,
  Media,
} from 'bloomer';
import {Link, Redirect} from 'react-router-dom';
import NiceNavbar from './NiceNavbar';
import NiceFooter from './NiceFooter';
import {getCookie} from './utils';
import {getMyTalks} from './api';
import moment from 'moment';

const MyTalks = (props) => {
  const [userSession, setUserSession] = useState({
    isLogged: false,
    token: null,
    newPasswordRequired: false,
  });
  const [triedSession, setTriedSession] = useState(false);
  useEffect(() => {
    const userToken = getCookie('token');
    if (userToken) {
      setUserSession({
        isLogged: true,
        token: userToken,
      });
    } else {
      setTriedSession(true);
    }
  }, []);

  const [myTalks, setMyTalks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getTalks() {
      const response = await getMyTalks(userSession.token);
      if (response.status === 200) {
        const responseReady = await response.json();
        setMyTalks(responseReady);
      } else {
        setMyTalks([]);
      }
      setIsLoading(false);
    }
    getTalks();
  }, [userSession]);

  if (triedSession && !userSession.isLogged) {
    return <Redirect to="/login" />;
  }

  if (!triedSession && !userSession.isLogged) {
    return <div>Loading ...</div>;
  }

  let createTalkMaybe;
  if (!myTalks || !myTalks.length) {
    createTalkMaybe = (
      <Fragment>
        <h2>None found, start one yourself!</h2>
      </Fragment>
    );
  }

  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <NiceNavbar isAuthed={userSession.isLogged} />
        </HeroHeader>
      </Hero>
      <Section>
        <Container>
          <Link to="/new">
            <Button isPulled="right" isColor="primary">
              Create Talk
            </Button>
          </Link>
          <Title>Your chats</Title>
          {createTalkMaybe}
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
            <ul>
              {myTalks &&
                myTalks.map((talk) => (
                  <li key={talk.shortId}>
                    <Link to={`t/${talk.shortId}`}>
                      <Card className="talk-listing">
                        <CardContent>
                          <Media>
                            <MediaContent>
                              <Subtitle className="subject" isSize={4}>
                                {talk.subject}
                              </Subtitle>
                            </MediaContent>
                          </Media>
                          <Content>
                            <small>{moment(talk.createdAt).format('ll')}</small>
                          </Content>
                        </CardContent>
                      </Card>
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </Container>
      </Section>
      <NiceFooter />
    </React.Fragment>
  );
};
export default MyTalks;
