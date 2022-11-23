import { useAuth } from "../util/auth";
import "./Navbar.css";
import {Navbar,NavDropdown,  Container, Nav, Button} from "react-bootstrap";

export default function NavigationBar() {
  const { isLoggedIn, logout, user } = useAuth();


  return (

    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">COGS</Navbar.Brand>
        {/* {console.log(user)} */}
      {isLoggedIn ? (
        <div>
          <Nav>
            <NavDropdown title="Services">            
              <NavDropdown.Item href="/cogs">
                Cogs Check
              </NavDropdown.Item>
              {
                user.access === "admin"?
                  <NavDropdown.Item href="/cogsadmin">
                    Cogs Admin
                  </NavDropdown.Item>:<div/>
              }
              <NavDropdown.Item href="/functionTest">
                Function Test
              </NavDropdown.Item>
              <NavDropdown.Item href="/cleaning">
                Cleaning
              </NavDropdown.Item>
            </NavDropdown>
            {user.access==="admin" ?
              <NavDropdown title="Tables">
                <NavDropdown.Item href="/cogsassessed">
                  COGS Assessed
                </NavDropdown.Item>
              </NavDropdown>
              :
              <div/>
              }
          
            <Nav.Link href="/user">
              User
            </Nav.Link>
            <Button variant="warning" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </div>
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
