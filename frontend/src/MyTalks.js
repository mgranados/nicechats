import React from 'react';
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
  Title,
  Container,
} from 'bloomer';
import {Link} from 'react-router-dom';
import NiceNavbar from './NiceNavbar';
import NiceFooter from './NiceFooter';

const MyTalks = () => {
  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <NiceNavbar />
        </HeroHeader>
      </Hero>
      <body>
        <Section>
          <Container>
            <Title>Your chats</Title>
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
        </Section>
      </body>
      <NiceFooter />
    </React.Fragment>
  );
};
export default MyTalks;
