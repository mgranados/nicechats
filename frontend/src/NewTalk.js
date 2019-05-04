import React, {useState, useEffect} from 'react';
import './Home.scss';
import {
  FieldLabel,
  FieldBody,
  Label,
  TextArea,
  Columns,
  Column,
  Hero,
  Help,
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

const createTalk = async (subject, userToken) => {
  const response = await fetch(`/v1/chats`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    body: JSON.stringify({subject}),
  });
  return response;
};

const NewTalk = () => {
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

  const [subject, setSubject] = useState('');
  const [errorCreating, setErrorCreating] = useState('');

  let errorLabel;
  if (errorCreating) {
    errorLabel = <Help isColor="warning">{errorCreating} </Help>;
  } else {
    errorLabel = <span />;
  }
  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <NiceNavbar isAuthed={userSession.isLogged} />
        </HeroHeader>
        <HeroBody>
          <Container hasTextAlign="centered">
            <Columns>
              <Column isSize={6} isOffset={3}>
                <Title>New talk</Title>
                <Field isHorizontal>
                  <FieldLabel isNormal>
                    <Label style={{color: 'white'}}>Subject</Label>
                  </FieldLabel>
                  <FieldBody>
                    <Field>
                      <Control isExpanded>
                        <TextArea
                          value={subject}
                          onChange={(event) => setSubject(event.target.value)}
                          type="text"
                          placeholder="Be expressive, the more detail the better"
                        />
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>

                <Field isHorizontal>
                  <FieldLabel />
                  <FieldBody>
                    <Field>
                      <Control>
                        <Button
                          isColor="primary"
                          onClick={async () => {
                            const response = await createTalk(
                              subject,
                              userSession.token,
                            );
                            if (response.status === 200) {
                              const responseReady = await response.json();
                              window.location.href = `/t/${
                                responseReady.shortId
                              }`;
                            } else {
                              setErrorCreating('Error creating right now');
                            }
                          }}>
                          Create
                        </Button>
                        {errorLabel}
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

export default NewTalk;
