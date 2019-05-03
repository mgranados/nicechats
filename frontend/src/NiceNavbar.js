import React from 'react';
import './Home.scss';
import {
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarStart,
  NavbarItem,
  NavbarEnd,
  NavbarBurger,
  Field,
  Control,
  Button,
} from 'bloomer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';

const NiceNavbar = (props) => {
  let sessionButton;
  if (props.isAuthed) {
    sessionButton = <Link to="/logout">Logout</Link>;
  } else {
    sessionButton = <Link to="/login">Login</Link>;
  }
  return (
    <Navbar style={{border: 'solid 1px #00D1B2', margin: '0'}}>
      <NavbarBrand>
        <NavbarItem>
          <Link to="/">
            <h2>💬 Nice talks</h2>
          </Link>
        </NavbarItem>
        <NavbarBurger />
      </NavbarBrand>
      <NavbarMenu isActive={true} onClick={() => console.log('clicked')}>
        <NavbarStart>
          <NavbarItem>
            <Link to="/my-talks">My talks</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/talks">All talks</Link>
          </NavbarItem>
        </NavbarStart>
        <NavbarEnd>
          <NavbarItem>{sessionButton}</NavbarItem>
          <NavbarItem>
            <Field isGrouped>
              <Control>
                <Button
                  id="twitter"
                  data-social-network="Twitter"
                  data-social-action="tweet"
                  data-social-target="http://nicetalks.co"
                  target="_blank"
                  href="https://twitter.com/intent/tweet?text=Nicetalks:
                    having great conversations at&amp;url=http://nicetalks.co&amp;via=mgranados_">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="a-lil-to-the-right"
                  />
                  <span>Tweet</span>
                </Button>
              </Control>
            </Field>
          </NavbarItem>
        </NavbarEnd>
      </NavbarMenu>
    </Navbar>
  );
};
export default NiceNavbar;
