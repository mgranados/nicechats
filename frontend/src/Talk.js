import React from 'react';
import './Home.scss';
import {
  Box,
  FieldLabel,
  FieldBody,
  FieldArea,
  TextArea,
  Label,
  Input,
  Help,
  Checkbox,
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
import {faSync} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const Talk = ({match}) => {
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
      <Section>
        <Container hasTextAlign="centered">
          <Columns>
            <Column isSize={6} isOffset={3}>
              <Subtitle>
                Why there's only {`${match.params.id}`} options to say goodbye
                in english
              </Subtitle>
              <Card>
                <CardContent hasTextAlign="left">
                  <Media>
                    <MediaContent>
                      <Subtitle isSize={6}>@johnwick</Subtitle>
                    </MediaContent>
                  </Media>
                  <Content>
                    People Keep Asking If I’m Back, And I Haven’t Really Had An
                    Answer, But Now, Yeah, I’m Thinking I’m Back.
                    <br />
                    <small>11:13 PM</small>
                  </Content>
                </CardContent>
                <CardContent hasTextAlign="right">
                  <Media>
                    <MediaContent>
                      <Subtitle isPulled={'right'} isSize={6}>
                        @elmarto
                      </Subtitle>
                    </MediaContent>
                  </Media>
                  <Content>
                    People Keep Asking If I’m Back, And I Haven’t Really Had An
                    Answer, But Now, Yeah, I’m Thinking I’m Back.
                    <br />
                    <small>11:15 PM</small>
                  </Content>
                </CardContent>
                <CardContent hasTextAlign="left">
                  <Media>
                    <MediaContent>
                      <Subtitle isSize={6}>@johnwick</Subtitle>
                    </MediaContent>
                  </Media>
                  <Content>
                    People Keep Asking If I’m Back, And I Haven’t Really Had An
                    Answer, But Now, Yeah, I’m Thinking I’m Back.
                    <br />
                    <small>11:18 PM</small>
                  </Content>
                </CardContent>
              </Card>
              <Field isHorizontal className="message-box">
                <FieldBody>
                  <Field>
                    <Control>
                      <TextArea placeholder="Explain why 42 is the answer to the Ultimate Question of Life, the Universe and Everything" />
                    </Control>
                  </Field>
                </FieldBody>
              </Field>

              <Field isHorizontal isPulled="right">
                <FieldBody>
                  <Field>
                    <Control>
                      <Button isColor="secondary" className="sync-button">
                        <FontAwesomeIcon icon={faSync} />
                      </Button>
                      <Button isColor="primary">Submit</Button>
                    </Control>
                  </Field>
                </FieldBody>
              </Field>
            </Column>
          </Columns>
        </Container>
      </Section>
    </React.Fragment>
  );
};
export default Talk;
