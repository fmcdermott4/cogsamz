import { useAuth } from "../util/auth";
import "./Navbar.css";
import {Navbar, Container, Nav, Button} from "react-bootstrap";

export default function NavigationBar() {
  const { isLoggedIn, logout, user } = useAuth();


  return (

    <Navbar bg="primary" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">COGS</Navbar.Brand>
        {/* {console.log(user)} */}
      {isLoggedIn ? (
        <Nav>
          <Nav.Link href="/cogs">
           Cogs Tool
          </Nav.Link>
          {user.access==="admin" ? <Nav.Link href="/servicesselected">
            Service Table
          </Nav.Link>:<div/>}
          <Nav.Link href="/user">
            User
          </Nav.Link>
          <Button variant="warning" onClick={logout}>
            Logout
          </Button>
        </Nav>
      ) : (
        <Nav>
          <Nav.Link href="/login" className="navbar-link">
            Login
          </Nav.Link>
          <Nav.Link href="/signup" className="navbar-link">
            Signup
          </Nav.Link>
        </Nav>
      )}
      </Container>
    </Navbar>
  );
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // return (
  //   <nav className="navbar">
  //     <NavLink exact href="/" className="navbar-link">
  //       Home
  //     </NavLink>
  //     {isLoggedIn ? (
  //       <>
  //         <NavLink href="/cogs" className="navbar-link">
  //          Cogs Tool
  //         </NavLink>
  //         <NavLink href="/servicesselected" className="navbar-link">
  //           Service Table
  //         </NavLink>
  //         <NavLink href="/user" className="navbar-link">
  //           User
  //         </NavLink>
  //         <button className="navbar-link" onClick={logout}>
  //           Logout
  //         </button>
  //       </>
  //     ) : (
  //       <>
  //         <NavLink href="/login" className="navbar-link">
  //           Login
  //         </NavLink>
  //         <NavLink href="/signup" className="navbar-link">
  //           Signup
  //         </NavLink>
  //       </>
  //     )}
  //   </nav>
  // );
}
