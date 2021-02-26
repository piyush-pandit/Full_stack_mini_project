import React, {useEffect} from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import secureAxios from "../secureAxios"

function Header(props) {
  console.log(props.authCredentials, "hatttttt")

  useEffect(() => {
    const postData = {username: localStorage.getItem("username"), password: localStorage.getItem("password")}
    if (postData.username!= null){
      secureAxios
      .post(
        "/login/", postData,
        {headers: {
          'Content-Type': 'application/json'}
        }
      )
      .then((response) => {
        console.log(response.data);
        props.loginDetails(postData)

        props.history.push("/blogPage");
      }).catch(err=>{
        console.log(err)
      })
    }
  }, [])

  return (
    <div className="heado">
      <Navbar collapseOnSelect expand="lg" bg="warning" variant="warning">
        <Navbar.Brand href="#home">Bloggers</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {!props.authCredentials.username ? (
              <NavItem className="my-auto mx-2">
                <Link to="/">Login</Link>{" "}
              </NavItem>
            ) : (
              <>
                <NavItem className="my-auto mx-2">
                  <Link to="/blogPage">Home</Link>{" "}
                </NavItem>
              </>
            )}
          </Nav>
          <Nav>
            <NavItem className="my-auto mx-2">
              {props.authCredentials.username}
            </NavItem>

            {props.authCredentials.username ? (
              <NavItem className="my-auto mx-2">
                <Link to="/logoutPage">Logout</Link>{" "}
              </NavItem>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {console.log(props.authCredentials, "errrrrrrrr")}
      {props.authCredentials.username ? <h1>My Blogs !</h1> : <></>}
    </div>
  );
}


const mapStateToProps = (state, props) => {
  return {
    authCredentials: state.authCredentials
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginDetails: (val) => dispatch({ type: "LOGIN_DETAILS", payload: val })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
