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
  Help,
  Container,
} from 'bloomer';
import NiceNavbar from './NiceNavbar';
import {setCookie, getCookie} from './utils';
import {updatePassword} from './api';

const NewPass = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userSession, setUserSession] = useState({
    isLogged: false,
    token: null,
  });
  useEffect(() => {
    const userToken = getCookie('token');
    if (userToken) {
      setUserSession({
        isLogged: true,
        token: userToken,
      });
    }
  }, []);

  let errorLabel;
  if (error) {
    errorLabel = <Help isColor="white">{error} </Help>;
  }
  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <NiceNavbar updatingPass={true} isAuthed={userSession.isLogged} />
        </HeroHeader>
        <HeroBody>
          <Container hasTextAlign="centered">
            <Columns>
              <Column isSize={6} isOffset={3}>
                <Title>Update your password</Title>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setError('');
                    if (password === passwordConfirmation) {
                      const response = await updatePassword(
                        userSession.token,
                        password,
                      );
                      if (response.status === 200) {
                        const responseReady = await response.json();
                        setCookie('token', responseReady.token, 3);
                        setCookie('userName', responseReady.userName, 3);
                        window.location.href = '/my-talks';
                      } else {
                        setError('Error updating password');
                        setLoading(false);
                      }
                    } else {
                      setError('Passwords do not match');
                      setLoading(false);
                    }
                  }}>
                  <Field isHorizontal>
                    <FieldLabel isNormal>
                      <Label style={{color: 'white'}}>New Password</Label>
                    </FieldLabel>
                    <FieldBody>
                      <Field>
                        <Control isExpanded>
                          <Input
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            type="password"
                            placeholder="HopeIts4G00dOn3"
                          />
                        </Control>
                      </Field>
                    </FieldBody>
                  </Field>
                  <Field isHorizontal>
                    <FieldLabel isNormal>
                      <Label style={{color: 'white'}}>Confirm Password</Label>
                    </FieldLabel>
                    <FieldBody>
                      <Field>
                        <Control isExpanded>
                          <Input
                            value={passwordConfirmation}
                            type="password"
                            onChange={(event) =>
                              setPasswordConfirmation(event.target.value)
                            }
                            placeholder="Same as the one that's up there"
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

export default NewPass;
