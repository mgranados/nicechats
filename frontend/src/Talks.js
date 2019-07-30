import React, {Fragment, useState, useEffect} from 'react';
import './Home.scss';
import {
  Content,
  Section,
  Card,
  CardContent,
  Media,
  MediaContent,
  Hero,
  HeroHeader,
  Button,
  Title,
  Subtitle,
  Container,
} from 'bloomer';
import {Link} from 'react-router-dom';
import NiceNavbar from './NiceNavbar';
import NiceFooter from './NiceFooter';
import {getCookie} from './utils';
import {getTalks} from './api';
import moment from 'moment';

const Talks = (props) => {
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
  }, []);

  const [talks, setTalks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getAvailableTalks(route, token) {
      const response = await getTalks(route, token);
      if (response.status === 200) {
        const responseReady = await response.json();
        setTalks(responseReady);
      } else {
        setTalks([]);
      }
      setIsLoading(false);
    }
    if (userSession.token) {
      getAvailableTalks('others', userSession.token);
    } else {
      getAvailableTalks('available');
    }
  }, [userSession]);

  let createTalkMaybe;
  if (!talks || !talks.length) {
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
          <Title>You can talk about:</Title>
          {createTalkMaybe}
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
            <ul>
              {talks &&
                talks.map((talk) => (
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
                            <span
                              className="is-pulled-right"
                              hasTextAlign="right">
                              <small>with</small>{' '}
                              {talk.author && talk.author.userName}
                            </span>
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
export default Talks;
