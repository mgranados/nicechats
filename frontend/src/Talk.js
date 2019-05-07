import React, {useState, useEffect} from 'react';
import './Home.scss';
import {
  FieldBody,
  TextArea,
  Content,
  Section,
  Subtitle,
  Card,
  CardContent,
  Media,
  MediaContent,
  Columns,
  Column,
  Hero,
  HeroHeader,
  Field,
  Control,
  Button,
  Container,
} from 'bloomer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import NiceNavbar from './NiceNavbar';
import {getCookie} from './utils';

const getTalkDetails = async (talkId, userToken) => {
  const response = await fetch(`/v1/chats/${talkId}/messages`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response;
};

const postNewMessage = async (message, talkId, userToken) => {
  const response = await fetch(`/v1/chats/${talkId}/messages`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    body: JSON.stringify({message}),
  });
  return response;
};

const postJoinTalk = async (talkId, userToken) => {
  const response = await fetch(`/v1/chats/${talkId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response;
};

const Talk = (props) => {
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

  const [fullTalk, setFullTalk] = useState({});
  const [reloadPage, setReloadPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    () => {
      setIsLoading(true);
      async function getTalk() {
        const response = await getTalkDetails(
          props.match.params.id,
          userSession.token,
        );
        if (response.status === 200) {
          const responseReady = await response.json();
          setFullTalk(responseReady);
        } else {
          setFullTalk([]);
        }
        setIsLoading(false);
      }
      getTalk();
      if (reloadPage) {
        setReloadPage(false);
      }
    },
    [userSession, reloadPage],
  );

  const [newMessage, setNewMessage] = useState('');
  const [post, setPost] = useState(false);
  useEffect(
    () => {
      async function postMessage() {
        const response = await postNewMessage(
          newMessage,
          props.match.params.id,
          userSession.token,
        );
        if (response.status === 200) {
          const responseReady = await response.json();
          setReloadPage(true);
        }
      }
      if (post) {
        postMessage();
      }
      setNewMessage('');
      setPost(false);
    },
    [post],
  );

  const [partOfChat, setPartOfChat] = useState(false);
  const [joinChat, setJoinChat] = useState(false);
  useEffect(
    () => {
      async function joinChatAsync() {
        const response = await postJoinTalk(
          props.match.params.id,
          userSession.token,
        );
        if (response.status === 200) {
          const responseReady = await response.json();
          setReloadPage(true);
          setPartOfChat(true);
        }
      }
      // verify if not part of chat already
      if (fullTalk && fullTalk.participants) {
        fullTalk.participants.map((participant) => {
          if (participant.userName === userSession.userName) {
            setPartOfChat(true);
          }
        });
      }

      if (joinChat) {
        joinChatAsync();
      }
      setJoinChat(false);
    },
    [joinChat, userSession, fullTalk],
  );

  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <NiceNavbar isAuthed={userSession.isLogged} />
        </HeroHeader>
      </Hero>
      <Section>
        <Container hasTextAlign="centered">
          <Columns>
            <Column isSize={6} isOffset={3}>
              <Subtitle>{fullTalk.subject}</Subtitle>
              <Card>
                {isLoading ? (
                  <div>Loading ...</div>
                ) : (
                  <div>
                    {fullTalk.messages &&
                      fullTalk.messages.map((message) => (
                        //make alignment based if author is user
                        <CardContent key={message.uuid} hasTextAlign="left">
                          <Content>
                            {message.actualMessage}
                            <br />
                            <Subtitle isSize={6} className="username">
                              <small>
                                @{message.author.userName} -
                                {message.createdAt}
                              </small>
                            </Subtitle>
                          </Content>
                        </CardContent>
                      ))}
                  </div>
                )}
              </Card>
              {partOfChat ? (
                <React.Fragment>
                  <Field isHorizontal className="message-box">
                    <FieldBody>
                      <Field>
                        <Control>
                          <TextArea
                            value={newMessage}
                            onChange={(event) =>
                              setNewMessage(event.target.value)
                            }
                            placeholder="Explain why 42 is the answer to the Ultimate Question of Life, the Universe and Everything"
                          />
                        </Control>
                      </Field>
                    </FieldBody>
                  </Field>

                  <Field isHorizontal isPulled="right">
                    <FieldBody>
                      <Field>
                        <Control>
                          <Button
                            onClick={() => setReloadPage(true)}
                            isColor="secondary"
                            className="sync-button">
                            <FontAwesomeIcon icon={faSync} />
                          </Button>
                          <Button
                            onClick={() => setPost(true)}
                            isColor="primary">
                            Submit
                          </Button>
                        </Control>
                      </Field>
                    </FieldBody>
                  </Field>
                </React.Fragment>
              ) : (
                <Field isHorizontal isPulled="right">
                  <FieldBody>
                    <Field>
                      <Control>
                        <Button
                          onClick={() => setJoinChat(true)}
                          isColor="primary">
                          Join Chat
                        </Button>
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>
              )}
            </Column>
          </Columns>
        </Container>
      </Section>
    </React.Fragment>
  );
};
export default Talk;
