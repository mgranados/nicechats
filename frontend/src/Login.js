import React, {useState, useEffect} from 'react';
import './Home.scss';
import {
  FieldLabel,
  FieldBody,
  Label,
  Input,
  Columns,
  Column,
  Hero,
  HeroHeader,
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarStart,
  NavbarItem,
  NavbarEnd,
  NavbarBurger,
  Field,
  Control,
  Button,
  HeroBody,
  Title,
  Container,
} from 'bloomer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {Link, Redirect} from 'react-router-dom';

const login = async (email, password) => {
  const response = await fetch(`/v1/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  });
  return response;
};

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const Login = () => {
  const [session, setSession] = useState({userToken: null});
  const [loginError, setloginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <NavbarMenu isActive={true}>
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
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
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
                        <Input
                          value={password}
                          type="password"
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="HopeIts4G00dOn3"
                        />
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>

                <Field isHorizontal>
                  <FieldLabel /> {/* empty for spacing */}
                  <FieldBody>
                    <Field>
                      <Control>
                        <Button
                          isColor="primary"
                          onClick={async () => {
                            const response = await login(email, password);
                            if (response.status === 200) {
                              const responseReady = await response.json();
                              setCookie('token', responseReady.token, 3);
                              window.location.href = '/my-talks';
                            }
                          }}>
                          Submit
                        </Button>
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>
                <p>{session.userToken}</p>
                <p>{loginError}</p>
              </Column>
            </Columns>
          </Container>
        </HeroBody>
      </Hero>
    </React.Fragment>
  );
};

export default Login;
