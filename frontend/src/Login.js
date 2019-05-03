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
  Field,
  Control,
  Button,
  HeroBody,
  Title,
  Container,
} from 'bloomer';
import NiceNavbar from './NiceNavbar';

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
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
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
          <NiceNavbar />
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
