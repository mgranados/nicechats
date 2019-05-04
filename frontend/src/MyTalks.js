import React, {useState, useEffect} from 'react';
import './Home.scss';
import {
  Content,
  Section,
  Button,
  Card,
  CardContent,
  Media,
  MediaContent,
  Hero,
  HeroHeader,
  Title,
  Container,
} from 'bloomer';
import {Link} from 'react-router-dom';
import NiceNavbar from './NiceNavbar';
import NiceFooter from './NiceFooter';

const getMyTalks = async (userToken) => {
  const response = await fetch(`/v1/chats/me`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response;
};

const MyTalks = (props) => {
  const [myTalks, setMyTalks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //useEffect to get talks
  useEffect(() => {
    const getTalks = async () => {
      setIsLoading(true);
      const response = await getMyTalks(props.userToken);
      if (response.status === 200) {
        const responseReady = await response.json();
        setMyTalks(responseReady);
      }
      setIsLoading(false);
    };
    getTalks();
  }, []);

  //render list only
  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <NiceNavbar isAuthed={props.isLogged} />
        </HeroHeader>
      </Hero>
      <body>
        <Section>
          <Container>
            <Link to="/new">
              <Button isPulled="right" isColor="primary">
                Create Talk
              </Button>
            </Link>
            <Title>Your chats</Title>
            {isLoading ? (
              <div>Loading ...</div>
            ) : (
              <ul>
                {myTalks &&
                  myTalks.map((talk) => (
                    <li key={talk.shortId}>
                      <Link to={`t/${talk.shortId}`}>
                        <Card>
                          <CardContent>
                            <Media>
                              <MediaContent>
                                <Title isSize={5}>John Wick 123</Title>
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
      </body>
      <NiceFooter />
    </React.Fragment>
  );
};
export default MyTalks;
