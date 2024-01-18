import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="sm">
      <Container>
        <Nav className="m-auto fs-4">
          <Nav.Link href="/" active={pathname === '/'}>
            Accounts
          </Nav.Link>

          <Nav.Link href="/profiles" active={pathname === '/profiles'}>
            Profiles
          </Nav.Link>

          <Nav.Link href="/campaigns" active={pathname === '/campaigns'}>
            Campaigns
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
