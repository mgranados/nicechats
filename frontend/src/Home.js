import React from 'react';
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

const Home = (props) => {
  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <NiceNavbar isAuthed={props.isLogged} />
        </HeroHeader>
        <HeroBody>
          <Container hasTextAlign="centered">
            <Title>Discuss topics that matter to you!</Title>
            <Subtitle>
              All chats created by users just like you,{' '}
              <strong>ready for you </strong>to hop on and have a good time
            </Subtitle>
          </Container>
        </HeroBody>
      </Hero>
      <Section>
        <Container>
          <Title>Today</Title>
          <ul>
            <li>
              <Link to="/t/123">
                <Card>
                  <CardContent>
                    <Media>
                      <MediaContent>
                        <Title isSize={5}>John Wick 123</Title>
                      </MediaContent>
                    </Media>
                    <Content>
                      People Keep Asking If I’m Back, And I Haven’t Really Had
                      An Answer, But Now, Yeah, I’m Thinking I’m Back.
                      <br />
                      <small>30 minutes ago</small>
                    </Content>
                  </CardContent>
                </Card>
              </Link>
            </li>
            <li>
              <a>
                <Card>
                  <CardContent>
                    <Media>
                      <MediaContent>
                        <Title isSize={5}>El Marto</Title>
                      </MediaContent>
                    </Media>
                    <Content>
                      People Keep Asking If I’m Back, And I Haven’t Really Had
                      An Answer, But Now, Yeah, I’m Thinking I’m Back.
                      <br />
                      <small>50 minutes ago</small>
                    </Content>
                  </CardContent>
                </Card>
              </a>
            </li>
            <li>
              <a>
                <Card>
                  <CardContent>
                    <Media>
                      <MediaContent>
                        <Title isSize={5}>El Marto</Title>
                      </MediaContent>
                    </Media>
                    <Content>
                      People Keep Asking If I’m Back, And I Haven’t Really Had
                      An Answer, But Now, Yeah, I’m Thinking I’m Back.
                      <br />
                      <small>50 minutes ago</small>
                    </Content>
                  </CardContent>
                </Card>
              </a>
            </li>
          </ul>
        </Container>

        <Container className="yesterday-list">
          <Title isSize={4}>Yesterday</Title>
          <ul>
            <li>
              <a>
                <Card>
                  <CardContent>
                    <Media>
                      <MediaContent>
                        <Title isSize={5}>John Wick</Title>
                      </MediaContent>
                    </Media>
                    <Content>
                      People Keep Asking If I’m Back, And I Haven’t Really Had
                      An Answer, But Now, Yeah, I’m Thinking I’m Back.
                      <br />
                      <small>30 minutes ago</small>
                    </Content>
                  </CardContent>
                </Card>
              </a>
            </li>
            <li>
              <a>
                <Card>
                  <CardContent>
                    <Media>
                      <MediaContent>
                        <Title isSize={5}>El Marto</Title>
                      </MediaContent>
                    </Media>
                    <Content>
                      People Keep Asking If I’m Back, And I Haven’t Really Had
                      An Answer, But Now, Yeah, I’m Thinking I’m Back.
                      <br />
                      <small>50 minutes ago</small>
                    </Content>
                  </CardContent>
                </Card>
              </a>
            </li>
            <li>
              <a>
                <Card>
                  <CardContent>
                    <Media>
                      <MediaContent>
                        <Title isSize={5}>El Marto</Title>
                      </MediaContent>
                    </Media>
                    <Content>
                      People Keep Asking If I’m Back, And I Haven’t Really Had
                      An Answer, But Now, Yeah, I’m Thinking I’m Back.
                      <br />
                      <small>50 minutes ago</small>
                    </Content>
                  </CardContent>
                </Card>
              </a>
            </li>
          </ul>
        </Container>
      </Section>
      <NiceFooter />
    </React.Fragment>
  );
};
export default Home;
