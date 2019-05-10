import React from 'react';
import './Home.scss';
import {Footer, Content, Columns, Column, Container} from 'bloomer';

const NiceFooter = () => {
  return (
    <Footer id="footer">
      <Container>
        <Content>
          <Columns>
            <Column isSize={12}>
              <p>
                Made with ☕️ by{' '}
                <a href="https://twitter.com/mgranados_" target="_blank">
                  mgranados
                </a>
              </p>
            </Column>
          </Columns>
          <Content isSize="small">
            <p>Not many rights reserved. 2019</p>
          </Content>
        </Content>
      </Container>
    </Footer>
  );
};

export default NiceFooter;
