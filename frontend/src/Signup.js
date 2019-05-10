import React, {useState} from 'react';
import './Home.scss';
import {
  FieldLabel,
  FieldBody,
  Label,
  Input,
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
import {signup} from './api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

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
                <Title>Register</Title>
                <Field isHorizontal>
                  <FieldLabel isNormal>
                    <Label style={{color: 'white'}}>Email</Label>
                  </FieldLabel>
                  <FieldBody>
                    <Field>
                      <Control isExpanded>
                        <Input
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          type="email"
                          placeholder="something@gmail.com most likely"
                        />
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>
                <Field isHorizontal>
                  <FieldLabel isNormal>
                    <Label style={{color: 'white'}}>Username</Label>
                  </FieldLabel>
                  <FieldBody>
                    <Field>
                      <Control isExpanded>
                        <Input
                          value={userName}
                          onChange={(event) => setUserName(event.target.value)}
                          type="text"
                          placeholder="user90210"
                        />
                      </Control>
                    </Field>
                  </FieldBody>
                </Field>

                <Field isHorizontal>
                  <FieldLabel isNormal>
                    <Label style={{color: 'white'}}>Password</Label>
                  </FieldLabel>
                  <FieldBody>
                    <Field>
                      <Control isExpanded>
                        <Input
                          value={password}
                          type="password"
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="HopeIts4G00dOn3"
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
                            const response = await signup(
                              email,
                              password,
                              userName,
                            );
                            if (response.status === 200) {
                              window.location.href = '/login';
                            }
                          }}>
                          Submit
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

export default Signup;
