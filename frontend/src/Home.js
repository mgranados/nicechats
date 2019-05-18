import React, {useState, useEffect} from 'react';
import './Home.scss';
import {
  Content,
  Section,
  Subtitle,
  Card,
  CardContent,
  Media,
  MediaContent,
  Hero,
  HeroHeader,
  HeroBody,
  Title,
  Container,
} from 'bloomer';
import {Link} from 'react-router-dom';
import NiceNavbar from './NiceNavbar';
import NiceFooter from './NiceFooter';
import {getCookie} from './utils';
import {getRecentTalks} from './api';

const Home = (props) => {
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

  const [recentTalks, setRecentTalks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getHomeTalks() {
      const response = await getRecentTalks();
      if (response.status === 200) {
        const responseReady = await response.json();
        setRecentTalks(responseReady);
      } else {
        setRecentTalks([]);
      }
      setIsLoading(false);
    }
    getHomeTalks();
  }, []);

  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <NiceNavbar isAuthed={userSession.isLogged} />
        </HeroHeader>
        <HeroBody>
          <Container hasTextAlign="centered">
            <Title>Have Nice Talks!</Title>
            <Subtitle>
              Create and join meaningful conversations,{' '}
              <strong>you decide the subjects</strong> and find peers that are
              interested as well
            </Subtitle>
          </Container>
        </HeroBody>
      </Hero>
      <Section>
        <Container>
          <Title>Recent Talks</Title>
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
            <ul>
              {recentTalks &&
                recentTalks.map((talk) => (
                  <li key={talk.shortId}>
                    <Link to={`t/${talk.shortId}`}>
                      <Card>
                        <CardContent>
                          <Media>
                            <MediaContent>
                              <Subtitle isSize={5}>
                                {talk.participants[0].userName}
                              </Subtitle>
                            </MediaContent>
                          </Media>
                          <Content>
                            {talk.subject}
                            <br />
                            <small>{talk.createdAt}</small>
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
export default Home;
