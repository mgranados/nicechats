import React, {useState, useEffect} from 'react';
import './Home.scss';
import {
  FieldLabel,
  FieldBody,
  Select,
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
import {createTalk} from './api';

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

  const [publicVisible, setPublicVisible] = useState('private');
  let errorLabel;
  if (errorCreating) {
    errorLabel = <Help isColor="warning">{errorCreating} </Help>;
  } else {
    errorLabel = <span />;
  }
  let publicWarning;
  if (publicVisible === 'public') {
    publicWarning = (
      <Help isColor="danger" className={'public-warning'}>
        Talk will be publicly auditable by{' '}
        <span className={'underlined'}>anyone!</span>
      </Help>
    );
  } else {
    publicWarning = <span />;
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
                <form>
                  <Field isHorizontal>
                    <FieldLabel isNormal>
                      <Label style={{color: 'white'}}>Subject</Label>
                    </FieldLabel>
                    <FieldBody>
                      <Field>
                        <Control isExpanded>
                          <TextArea
                            value={subject}
                            required
                            onChange={(event) => setSubject(event.target.value)}
                            type="text"
                            placeholder="Be expressive, the more detail the better"
                          />
                        </Control>
                      </Field>
                    </FieldBody>
                  </Field>
                  <Field isHorizontal>
                    <FieldLabel isNormal>
                      <Label style={{color: 'white'}}>Visibility:</Label>
                    </FieldLabel>
                    <FieldBody>
                      <Control>
                        <Select
                          onChange={(e) => {
                            setPublicVisible(e.target.value);
                          }}>
                          <option value="private">Private</option>
                          <option value="public">Public</option>
                        </Select>
                      </Control>
                      {publicWarning}
                    </FieldBody>
                  </Field>
                  <Field isHorizontal>
                    <FieldLabel />
                    <FieldBody>
                      <Control>
                        <Button
                          isColor="primary"
                          onClick={async () => {
                            const data = {
                              subject,
                              publiclyVisible: publicVisible === 'public',
                            };
                            const response = await createTalk(
                              data,
                              userSession.token,
                            );
                            if (response.status === 200) {
                              const responseReady = await response.json();
                              window.location.href = `/t/${
                                responseReady.shortId
                              }`;
                            } else if (response.status === 402) {
                              setErrorCreating('You do not have enough funds');
                            } else if (response.status === 422) {
                              setErrorCreating('No subject provided');
                            } else if (response.status === 403) {
                              setErrorCreating('Please login first');
                            } else {
                              setErrorCreating('Error creating your Talk');
                            }
                          }}>
                          Create Talk
                        </Button>
                        {errorLabel}
                      </Control>
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

export default NewTalk;
