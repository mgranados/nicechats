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
  Help,
  Container,
} from 'bloomer';
import NiceNavbar from './NiceNavbar';
import {setCookie} from './utils';
import {login} from './api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  let errorLabel;
  if (loginError) {
    errorLabel = <Help isColor="white">{loginError} </Help>;
  }
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
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setLoginError('');
                    const response = await login(email, password);
                    if (response.status === 200) {
                      const responseReady = await response.json();
                      setCookie('token', responseReady.token, 3);
                      setCookie('userName', responseReady.userName, 3);
                      setCookie(
                        'newPass',
                        responseReady.newPasswordRequired,
                        3,
                      );
                      if (responseReady.newPasswordRequired) {
                        window.location.href = '/update-password';
                      } else {
                        window.location.href = '/my-talks';
                      }
                    } else if (response.status === 401) {
                      setLoginError('Incorrect password');
                      setLoading(false);
                    } else if (response.status === 404) {
                      setLoginError('That email does not exist');
                      setLoading(false);
                    }
                  }}>
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
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
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
                          {errorLabel}
                          <Button
                            isColor="primary"
                            type="submit"
                            isLoading={loading}>
                            Submit
                          </Button>
                        </Control>
                      </Field>
                    </FieldBody>
                  </Field>
                </form>
              </Column>
            </Columns>
          </Container>
        </HeroBody>
      </Hero>
    </React.Fragment>
  );
};

export default Login;
