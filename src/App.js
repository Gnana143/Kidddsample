import React, { Component } from 'react';
//import logo from './logo.svg';
import  {AWS}  from 'aws';
import './App.css';
import userdata from './API/userdata';
import Adduser from './API/Adduser';
import { withAuthenticator } from 'aws-amplify-react';
import 'amazon-cognito-js';
//import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
//import { Button, Card, Row, Col, Navbar, NavItem } from 'react-materialize';
import { NavItem } from 'react-materialize';
import { Auth } from 'aws-amplify';
import updatecontent from './API/updatecontent';
import  Home  from './Home.jsx';
//AWS.config.region = 'ap-south-1'; 
//AWS.config.credentials = new AWS.CognitoIdentityCredentials({
 //   IdentityPoolId: 'ap-south-1:014d4099-c84e-4bb4-9250-696cda5f7013',
//});
//<NavItem onClick={this.signOut} left><Link to="/">Logout</Link></NavItem>
//<h3>welcome back {username}</h3>

class App extends Component {
  state = {
    logOut: false
}


signOut = async(e) => {
  e.preventDefault();
  var username= 'default';
  Auth.signOut()
      .then(
          sessionStorage.setItem('isLoggedIn', false),
          this.setState(() => {
              return {
                  logOut: true
              }
          })
          
      )
      .catch(err => console.log(err));    
}
  render() {
    const { logOut } = this.state;
    var myStyle = {
        fontSize: 100,
        color: '#FF0000'
     }
     
     //var  username=this.props.authData.username;
    return (
        
      <div >
                {
                    !logOut && (
                    <BrowserRouter>
                    <div>                  
                                
                                
                                <img src={require("./kiddo.jpg")}  className="img-responsive" />                                
                                
                                <NavItem><Link to="/home">Home</Link></NavItem>
                                <NavItem><Link to="/userAdd">AddUserdetails</Link></NavItem>
                                <NavItem><Link to="/userdata">UpdateuserData</Link></NavItem>
                                <NavItem><Link to="/updateCRON">updateCRON</Link></NavItem>
                            <Switch>
                                <Route exact path="/home" component={Home} />   
                                <Route exact path="/userAdd" component={Adduser} /> 
                                <Route exact path="/userdata" component={userdata} />   
                                <Route exact path="/updateCRON" component={updatecontent} />                             
                            </Switch>                                                       
                    </div>
                    </BrowserRouter>)
                }
                {
                    logOut && (<App authStatus={false}/>)
                }
           
            </div>
    );
  }
}


export default withAuthenticator(App,{ includeGreetings: true });
