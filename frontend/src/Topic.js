import React, {Fragment, useState, useEffect} from 'react';
import './Home.scss';
import {
  FieldBody,
  TextArea,
  Content,
  Section,
  Subtitle,
  Card,
  CardContent,
  Columns,
  Column,
  Hero,
  HeroHeader,
  Field,
  Control,
  Button,
  Container,
  Help,
} from 'bloomer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import NiceNavbar from './NiceNavbar';
import {getCookie} from './utils';
import {Link} from 'react-router-dom';
import {getTopicDetails, postNewTalk} from './api';
import moment from 'moment';

const Topic = (props) => {
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
  const [notAllowed, setNotAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getTalk() {
      const response = await getTopicDetails(
        props.match.params.id,
        userSession.token,
      );
      if (response.status === 200) {
        const responseReady = await response.json();
        setFullTalk(responseReady);
        setNotAllowed(false);
      } else if (response.status === 403) {
        setNotAllowed(true);
      } else {
        setFullTalk([]);
      }
      setIsLoading(false);
    }

    getTalk();

    if (reloadPage) {
      setReloadPage(false);
    }
  }, [userSession, reloadPage, props.match.params.id]);

  const [newMessage, setNewMessage] = useState('');
  const [post, setPost] = useState(false);
  useEffect(() => {
    async function postMessage() {
      const response = await postNewTalk(
        newMessage,
        props.match.params.id,
        userSession.token,
      );
      if (response.status === 200) {
        const responseReady = await response.json();
        //redirect to created Talk
        if (responseReady.shortId) {
          window.location.href = '/c/' + responseReady.shortId;
        }
      } else if (response.status === 422) {
        setErrorJoining('Please write something');
      }
    }
    if (post) {
      postMessage();
    }
    setNewMessage('');
    setPost(false);
  }, [post, props.match.params.id, userSession.token]);

  const [errorJoining, setErrorJoining] = useState('');

  let errorLabel;
  if (errorJoining) {
    errorLabel = <Help isColor="danger">{errorJoining} </Help>;
  } else {
    errorLabel = <span />;
  }

  let talkActions;
  if (userSession.isLogged) {
    talkActions = (
      <React.Fragment>
        <Field isHorizontal className="message-box">
          <FieldBody>
            <Field>
              <Control>
                <TextArea
                  value={newMessage}
                  required
                  onChange={(event) => setNewMessage(event.target.value)}
                  placeholder="What interested you about this subject? Make it worth it."
                />
              </Control>
            </Field>
          </FieldBody>
        </Field>
        <Field isHorizontal isPulled="right">
          <FieldBody>
            <Field>
              <Control>
                <Button onClick={() => setPost(true)} isColor="primary">
                  Join Chat
                </Button>
              </Control>
            </Field>
          </FieldBody>
        </Field>
      </React.Fragment>
    );
  } else {
    talkActions = (
      <Field isGrouped={'centered'} className="ableToJoin">
        <Control>
          <Link to="/login">
            <Button isPulled="right" isColor="primary">
              Log In
            </Button>
          </Link>
        </Control>
        <span> or </span>
        <Control>
          <Link to="/signup">
            <Button isPulled="right" isColor="primary">
              Sign Up
            </Button>
          </Link>
        </Control>
        <span> to say something</span>
      </Field>
    );
  }

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
              {talkActions}
              {errorLabel}
            </Column>
          </Columns>
        </Container>
      </Section>
    </React.Fragment>
  );
};
export default Topic;
