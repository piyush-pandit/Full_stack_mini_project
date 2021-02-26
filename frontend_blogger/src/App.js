import React from "react";
import "./styles.css";
import Header from "./components/header";
import Footer from './components/footer';
import "./footerStyle.css";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/loginPage";
import LogoutPage from "./components/logoutPage";
import BlogPage from "./components/blogPage";
import SignUpPage from "./components/signUpPage";
import MainBlogPage from "./components/mainBlogPage";
import {withRouter} from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  render() {
    console.log(window.location, this.props)
    const {location : {pathname}} = this.props 
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/blogPage" component={BlogPage} />
          <Route exact path="/signUpPage" component={SignUpPage} />
          <Route exact path="/logoutPage" component={LogoutPage} />
          <Route exact path="/mainBlogPage" component={MainBlogPage} />
        </Switch>
        {pathname !=="/" && <Footer />}
        
      </div>
    );
  }
}
export default withRouter(App);

