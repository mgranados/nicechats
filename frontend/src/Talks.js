import React, {useState, useEffect} from 'react';
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

const getTalks = async (route, userToken = '') => {
  let response;
  if (route === 'others') {
    response = await fetch(`/v1/chats/others`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
  } else {
    response = await fetch(`/v1/chats/available`, {
      method: 'get',
    });
  }
  return response;
};

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
  useEffect(
    () => {
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
    },
    [userSession],
  );

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
          <Title>Latest chats</Title>
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
            <ul>
              {talks &&
                talks.map((talk) => (
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
      <Section>
        <Container>
          <Button isColor="primary" isOutlined>
            More
          </Button>
        </Container>
      </Section>
      <NiceFooter />
    </React.Fragment>
  );
};
export default Talks;
