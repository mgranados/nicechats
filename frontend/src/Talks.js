import React from 'react';
import './Home.scss';
import {
  Footer,
  Content,
  Section,
  Subtitle,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  Media,
  MediaContent,
  Columns,
  Column,
  Hero,
  HeroHeader,
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarStart,
  NavbarItem,
  NavbarLink,
  NavbarDivider,
  NavbarEnd,
  NavbarBurger,
  NavbarDropdown,
  Field,
  Control,
  Button,
  Icon,
  HeroBody,
  Title,
  HeroFooter,
  Tabs,
  TabList,
  Tab,
  TabLink,
  Container,
} from 'bloomer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const Talks = () => {
  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <Navbar style={{border: 'solid 1px #00D1B2', margin: '0'}}>
            <NavbarBrand>
              <NavbarItem>
                <Link to="/">
                  <h2>💬 Nice talks</h2>
                </Link>
              </NavbarItem>
              <NavbarBurger />
            </NavbarBrand>
            <NavbarMenu isActive={true} onClick={() => console.log('clicked')}>
              <NavbarStart>
                <NavbarItem>
                  <Link to="/my-talks">My talks</Link>
                </NavbarItem>
                <NavbarItem>
                  <Link to="/talks">All talks</Link>
                </NavbarItem>
              </NavbarStart>
              <NavbarEnd>
                <NavbarItem>
                  <Link to="/login">Login</Link>
                </NavbarItem>
                <NavbarItem>
                  <Field isGrouped>
                    <Control>
                      <Button
                        id="twitter"
                        data-social-network="Twitter"
                        data-social-action="tweet"
                        data-social-target="http://nicetalks.co"
                        target="_blank"
                        href="https://twitter.com/intent/tweet?text=Nicetalks:
                    having great conversations at&amp;url=http://nicetalks.co&amp;via=mgranados_">
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className="a-lil-to-the-right"
                        />
                        <span>Tweet</span>
                      </Button>
                    </Control>
                  </Field>
                </NavbarItem>
              </NavbarEnd>
            </NavbarMenu>
          </Navbar>
        </HeroHeader>
      </Hero>
      <body>
        <Section>
          <Container>
            <Title>Latest chats</Title>
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
        <Section>
          <Container>
            <Button isColor="primary" isOutlined>
              More
            </Button>
          </Container>
        </Section>
      </body>
      <Footer id="footer">
        <Container>
          <Content>
            <Columns>
              <Column isFull>
                <p>
                  Made with ☕️ by <a>mgranados</a>
                </p>
              </Column>
            </Columns>
            <Content isSize="small">
              <p>Not many rights reserved. 2019</p>
            </Content>
          </Content>
        </Container>
      </Footer>
    </React.Fragment>
  );
};
export default Talks;
