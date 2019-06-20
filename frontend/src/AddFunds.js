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
import {createTalk} from './api';

const AddFunds = () => {
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

  var checkoutButton = document.getElementById(
    'checkout-button-sku_FHteiifSiNGoBM',
  );

  let errorLabel;
  if (errorCreating) {
    errorLabel = <Help isColor="warning">{errorCreating} </Help>;
  } else {
    errorLabel = <span />;
  }

  const checkoutStripe = async () => {
    window.stripe
      .redirectToCheckout({
        items: [{sku: 'sku_FHteiifSiNGoBM', quantity: 1}],

        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/canceled',
      })
      .then(function(result) {
        if (result.error) {
          setErrorCreating(result.error.message);
        }
      });
  };
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
                <Title>Add funds to your balance</Title>
                <br />
                <form>
                  <Field isHorizontal>
                    <FieldBody>
                      <Field>
                        <Control className="has-text-centered">
                          <Button
                            onClick={checkoutStripe}
                            className="funds"
                            role="link">
                            Add 5 funds
                          </Button>
                          {errorLabel}
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

export default AddFunds;
