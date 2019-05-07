import React, {useState} from 'react';
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
import {setCookie} from './utils';

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
const Login = () => {
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
                              setCookie('userName', responseReady.userName, 3);
                              window.location.href = '/my-talks';
                            }
                          }}>
                          Submit
                        </Button>
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
