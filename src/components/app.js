import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import { library } from"@fortawesome/fontawesome-svg-core";
import { faTrash, faSignOutAlt, faTools, faCog, faPlusCircle, faMinusCircle, faAt, faKey, faMapMarkerAlt, faPhone} from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import BlogDetail from './pages/blog-detail';
import PortfolioManager from './pages/portfolio-manager';
import PortfolioDetail from "./portfolio/portfolio-detail";
import Authentication from "./pages/authentication";
import NoMatch from "./pages/no-match";

library.add(faTrash, faSignOutAlt, faTools, faCog, faPlusCircle, faMinusCircle, faAt, faKey, faMapMarkerAlt, faPhone);


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {loggedInStatus: "NOT_LOGGED_IN" };

  this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
  this.handleFailedLogin = this.handleFailedLogin.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
}

handleSuccessfulLogin() {
  this.setState({loggedInStatus: "LOGGED_IN"});
}

handleFailedLogin() {
  this.setState({loggedInStatus: "NOT_LOGGED_IN"});
}

handleLogout() {
  this.setState({loggedInStatus: "NOT_LOGGED_IN"});
}

checkLoginStatus() {
  return axios.get("https://api.devcamp.space/logged_in", { withCredentials: true }).then(response => {const loggedIn=response.data.logged_in; const loggedInStatus=this.state.loggedInStatus;
  
  if (loggedIn && loggedInStatus === "LOGGED_IN") {return loggedIn;}
  else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {this.setState({loggedInStatus: "LOGGED_IN"});}
  else if (!loggedIn && loggedInStatus === "NOT_LOGGED_IN") {this.setState({loggedInStatus: "NOT_LOGGED_IN"});}
})
  .catch(error => {console.log("Error", error);});
}

componentDidMount() {
  this.checkLoginStatus();
}

authorizedPages() {
  return [<Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />]
}

  render() {
    return (
      <div className='container'>
        <Router>
          <div>
          
            <NavigationContainer loggedInStatus={this.state.loggedInStatus} handleLogout={this.handleLogout} />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/authentication" render={props => (<Authentication {...props} handleSuccessfulLogin= {this.handleSuccessfulLogin} handleFailedLogin= {this.handleFailedLogin} /> )} />

              <Route path="/about-me" render={props => <About {...props} loggedInStatus={this.state.loggedInStatus} />} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" render={props => <Blog {...props} loggedInStatus={this.state.loggedInStatus} />} />
              <Route path="/b/:permalink" render={props => <BlogDetail {...props} loggedInStatus={this.state.loggedInStatus} />} />
              {this.state.loggedInStatus === "LOGGED_IN" ? (this.authorizedPages()) : null}
              <Route exact path="/portfolio/:permalink" component={PortfolioDetail} />
              <Route component={NoMatch} />

            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}
