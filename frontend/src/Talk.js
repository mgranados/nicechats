import React from 'react';
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

const Talk = ({match}) => {
  return (
    <React.Fragment>
      <Hero isColor="info" isSize="medium">
        <HeroHeader>
          <NiceNavbar />
        </HeroHeader>
      </Hero>
      <Section>
        <Container hasTextAlign="centered">
          <Columns>
            <Column isSize={6} isOffset={3}>
              <Subtitle>
                Why there's only {`${match.params.id}`} options to say goodbye
                in english
              </Subtitle>
              <Card>
                <CardContent hasTextAlign="left">
                  <Media>
                    <MediaContent>
                      <Subtitle isSize={6}>@johnwick</Subtitle>
                    </MediaContent>
                  </Media>
                  <Content>
                    People Keep Asking If I’m Back, And I Haven’t Really Had An
                    Answer, But Now, Yeah, I’m Thinking I’m Back.
                    <br />
                    <small>11:13 PM</small>
                  </Content>
                </CardContent>
                <CardContent hasTextAlign="right">
                  <Media>
                    <MediaContent>
                      <Subtitle isPulled={'right'} isSize={6}>
                        @elmarto
                      </Subtitle>
                    </MediaContent>
                  </Media>
                  <Content>
                    People Keep Asking If I’m Back, And I Haven’t Really Had An
                    Answer, But Now, Yeah, I’m Thinking I’m Back.
                    <br />
                    <small>11:15 PM</small>
                  </Content>
                </CardContent>
                <CardContent hasTextAlign="left">
                  <Media>
                    <MediaContent>
                      <Subtitle isSize={6}>@johnwick</Subtitle>
                    </MediaContent>
                  </Media>
                  <Content>
                    People Keep Asking If I’m Back, And I Haven’t Really Had An
                    Answer, But Now, Yeah, I’m Thinking I’m Back.
                    <br />
                    <small>11:18 PM</small>
                  </Content>
                </CardContent>
              </Card>
              <Field isHorizontal className="message-box">
                <FieldBody>
                  <Field>
                    <Control>
                      <TextArea placeholder="Explain why 42 is the answer to the Ultimate Question of Life, the Universe and Everything" />
                    </Control>
                  </Field>
                </FieldBody>
              </Field>

              <Field isHorizontal isPulled="right">
                <FieldBody>
                  <Field>
                    <Control>
                      <Button isColor="secondary" className="sync-button">
                        <FontAwesomeIcon icon={faSync} />
                      </Button>
                      <Button isColor="primary">Submit</Button>
                    </Control>
                  </Field>
                </FieldBody>
              </Field>
            </Column>
          </Columns>
        </Container>
      </Section>
    </React.Fragment>
  );
};
export default Talk;
