import React from 'react';
import './Home.scss';
import {
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
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const Login = () => {
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
              <NavbarStart />
              <NavbarEnd>
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
        <HeroBody>
          <Container hasTextAlign="centered">
            <Columns>
              <Column isSize={6} isOffset={3}>
                <Title>Login</Title>
                <Field isHorizontal>
                  <FieldLabel isNormal>
                    <Label style={{color: 'white'}}>Email</Label>
                  </FieldLabel>
                  <FieldBody>
                    <Field>
                      <Control isExpanded>
                        <Input
                          type="email"
                          placeholder="something@gmail.com most likely"
                        />
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>
                <Field isHorizontal>
                  <FieldLabel isNormal>
                    <Label style={{color: 'white'}}>Password</Label>
                  </FieldLabel>
                  <FieldBody>
                    <Field>
                      <Control isExpanded>
                        <Input type="password" placeholder="HopeIts4G00dOn3" />
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>

                <Field isHorizontal>
                  <FieldLabel /> {/* empty for spacing */}
                  <FieldBody>
                    <Field>
                      <Control>
                        <Button isColor="primary">Submit</Button>
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>
              </Column>
            </Columns>
          </Container>
        </HeroBody>
      </Hero>
    </React.Fragment>
  );
};
export default Login;
