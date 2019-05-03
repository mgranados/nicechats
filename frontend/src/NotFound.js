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

const NotFound = ({match}) => {
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
              <Subtitle>Not Found. But what is really found anyways?</Subtitle>
            </Column>
          </Columns>
        </Container>
      </Section>
    </React.Fragment>
  );
};
export default NotFound;
