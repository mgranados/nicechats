import React from 'react';
import './Home.scss';
import {
  Button,
  Section,
  Subtitle,
  Columns,
  Column,
  Hero,
  HeroHeader,
  Container,
} from 'bloomer';
import NiceNavbar from './NiceNavbar';
import {Link} from 'react-router-dom';

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
              <Link to="/">
                <Button isPulled="right" isColor="primary">
                  Chewie, let's go Home
                </Button>
              </Link>
            </Column>
          </Columns>
        </Container>
      </Section>
    </React.Fragment>
  );
};
export default NotFound;
