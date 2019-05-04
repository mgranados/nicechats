import React from 'react';
import './Home.scss';
import {
  Section,
  Subtitle,
  Columns,
  Column,
  Hero,
  HeroHeader,
  Container,
} from 'bloomer';
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
              <Subtitle>Not Found. But what have we found anyways?</Subtitle>
            </Column>
          </Columns>
        </Container>
      </Section>
    </React.Fragment>
  );
};
export default NotFound;
