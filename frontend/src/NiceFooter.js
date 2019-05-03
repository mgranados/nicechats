import React from 'react';
import './Home.scss';
import {Footer, Content, Columns, Column, Container} from 'bloomer';

const NiceFooter = () => {
  return (
    <Footer id="footer">
      <Container>
        <Content>
          <Columns>
            <Column isFull>
              <p>
                Made with ☕️ by <a>mgranados</a>
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
