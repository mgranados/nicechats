import React, {useState, useEffect} from 'react';
import './Home.scss';
import {
  FieldLabel,
  FieldBody,
  Label,
  Input,
  Help,
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
import {getCookie} from './utils';
import {setTopics} from './api';

const SetTopics = () => {
  const [userSession, setUserSession] = useState({
    isLogged: false,
    token: null,
    userName: '',
  });

  useEffect(() => {
    const userToken = getCookie('token');
    const userName = getCookie('userName');
    if (userToken && userName) {
      setUserSession({
        isLogged: true,
        token: userToken,
        userName: userName,
      });
    }
  }, []);

  const [firstTopic, setFirstTopic] = useState('');
  const [secondTopic, setSecondTopic] = useState('');
  const [thirdTopic, setThirdTopic] = useState('');
  const [signupError, setSignupError] = useState('');

  let errorLabel;
  if (signupError) {
    errorLabel = <Help isColor="danger">{signupError} </Help>;
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
                <Title>Share your skills!</Title>
                <Field isHorizontal>
                  <FieldLabel isNormal>
                    <Label style={{color: 'white'}}>
                      One skill you're good at
                    </Label>
                  </FieldLabel>
                  <FieldBody>
                    <Field>
                      <Control isExpanded>
                        <Input
                          value={firstTopic}
                          onChange={(event) =>
                            setFirstTopic(event.target.value)
                          }
                          type="text"
                          placeholder="Making bacon pancakes"
                        />
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>
                <Field isHorizontal>
                  <FieldLabel isNormal>
                    <Label style={{color: 'white'}}>
                      Another skill you're good at
                    </Label>
                  </FieldLabel>
                  <FieldBody>
                    <Field>
                      <Control isExpanded>
                        <Input
                          value={secondTopic}
                          onChange={(event) =>
                            setSecondTopic(event.target.value)
                          }
                          type="text"
                          placeholder="Put some bacon and then put in a pancake"
                        />
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>
                <Field isHorizontal>
                  <FieldLabel isNormal>
                    <Label style={{color: 'white'}}>
                      One last skill you're good at
                    </Label>
                  </FieldLabel>
                  <FieldBody>
                    <Field>
                      <Control isExpanded>
                        <Input
                          value={thirdTopic}
                          onChange={(event) =>
                            setThirdTopic(event.target.value)
                          }
                          type="text"
                          placeholder="Being through the desert in a horse with no name "
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
                            if (!firstTopic || !secondTopic || !thirdTopic) {
                              setSignupError('Please fill your skills!');
                            } else {
                              const response = await setTopics(
                                firstTopic,
                                secondTopic,
                                thirdTopic,
                                userSession.token,
                              );
                              if (response.status === 200) {
                                window.location.href = '/';
                              }
                            }
                          }}>
                          Share Skills
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

export default SetTopics;
