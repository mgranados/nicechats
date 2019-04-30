import * as React from 'react';
import './App.scss';
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

function App() {
  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <Navbar style={{border: 'solid 1px #00D1B2', margin: '0'}}>
            <NavbarBrand>
              <NavbarItem>
                <h2>💬 Nice chats</h2>
              </NavbarItem>
              <NavbarBurger />
            </NavbarBrand>
            <NavbarMenu isActive={true} onClick={() => console.log('clicked')}>
              <NavbarStart>
                <NavbarItem href="#/">My chats</NavbarItem>
                <NavbarItem href="#/">All chats</NavbarItem>
              </NavbarStart>
              <NavbarEnd>
                <NavbarItem href="#/">Login</NavbarItem>
                <NavbarItem>
                  <Field isGrouped>
                    <Control>
                      <Button
                        id="twitter"
                        data-social-network="Twitter"
                        data-social-action="tweet"
                        data-social-target="http://nicechats.co"
                        target="_blank"
                        href="https://twitter.com/intent/tweet?text=Nicechats:
                    having great conversations at&amp;url=http://nicechats.co&amp;via=mgranados_">
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
      <body>
        <Section>
          <Container>
            <Title>Today</Title>
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
      </body>
      <Footer id="footer">
        <Container>
          <Content>
            <Columns>
              <Column isFull>
                <p>
                  Made with<FontAwesomeIcon icon={faCoffee} />
                  by <a>mgranados</a>
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
}
export default App;
