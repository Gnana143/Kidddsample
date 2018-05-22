import React, { Component } from 'react';
import './CSS/general.css';
import  AWS  from 'aws-sdk';
import awsmobile from './aws-exports';
import {awsServerlessExpressMiddleware}  from 'aws-serverless-express/middleware';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser   }  from 'amazon-cognito-identity-js';
//import { Card, Row, Col, Navbar, NavItem, Icon } from 'react-materialize';
import { Button} from 'semantic-ui-react';
//import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {API} from 'aws-amplify';
import TableContent from './API/TableContent';
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
AWS.config.region = 'ap-south-1';
var cognitoidentity = new AWS.CognitoIdentity();
var poolData = {
    UserPoolId : 'ap-south-1_WZAaIkFln', // Your user pool id here
    ClientId : '7qahll9gdvm1j1i0ani4764ehh' // Your client id here
};
// Configure the credentials provider to use your identity pool
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-south-1:014d4099-c84e-4bb4-9250-696cda5f7013',
});


// Make the call to obtain credentials



var userPool = new CognitoUserPool(poolData);
const dynamodb = new AWS.DynamoDB.DocumentClient();
export default class Home extends Component {

    state = {
        data: [],
        loading: null,
    }

    fetch = async () => { 
        console.log('coming to function');
        var cognitoID= userPool.storage['aws.cognito.identity-id.ap-south-1:014d4099-c84e-4bb4-9250-696cda5f7013'];
        var cognitoUser= userPool.storage['CognitoIdentityServiceProvider.7qahll9gdvm1j1i0ani4764ehh.LastAuthUser'];
        console.log(userPool);
        
        if(userPool.storage['aws.cognito.identity-providers.ap-south-1:014d4099-c84e-4bb4-9250-696cda5f7013']=='graph.facebook.com')
        {
           var fbtoken =  userPool.storage['aws-amplify-cachefederatedInfo'];
           //var fbtoken='EAACqjPT134UBABExxyg1eWuauzESDpNxjZAt3OMbZB30VqkArGlOwJnqkZBQEKKa5q7dmFru09P0t9wOEAWeey95JZBJD6upZCUj9LpIi59fcqZCVKBtOI26UpPau6VbxSRpbb9UKrckX7MjIhCenhohh7zAZAbajJGO5da7ZCF9ZCM9aKJCiu35DNp0LL9PDKF4zoWu5KdbGbwZDZD';
            console.log(fbtoken);
           var url= 'https://graph.facebook.com/me?fields=email&access_token='+fbtoken;
            axios.get(url)
            .then(function (response) {
                console.log(response.data.email);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        else {
        const user= reactLocalStorage.get('CognitoIdentityServiceProvider.7qahll9gdvm1j1i0ani4764ehh.LastAuthUser', true);
        var tok='CognitoIdentityServiceProvider.7qahll9gdvm1j1i0ani4764ehh.'+user+'.idToken';
        const Token= reactLocalStorage.get(tok, true);
        var playload = JSON.parse(atob(Token.split('.')[1]));
        console.log(playload['cognito:username']);
        var user_id= playload.sub;
        console.log(user_id);
        //console.log(Token);
        console.log(cognitoUser+cognitoID);
        var group=playload["cognito:groups"]["0"]
        console.log(group);
        }
        //console.log(AWS);
      /*  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-south-1:014d4099-c84e-4bb4-9250-696cda5f7013',
      });*/
     
        //console.log(userPool);
        //var identityId = AWS.config.credentials;
        
        //var cognitouserID= AWS.config.credentials.params.IdentityId;
        //console.log(cognitouserID);
       /* var params = {
            IdentityId: cognitouserID
          };
          cognitoidentity.getCredentialsForIdentity(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data+"coming here");           // successful response
          });
      
         /* var params1 = {
            TableName : 'kiddd-mobilehub-773472619-sample',
            Key: {
              userId: cognitouserID,
              id: user
            }
          };
          dynamodb.get(params1, function(err, data) {
             if (err) console.log(err);
             else console.log(data);
          }); */
       
     
        //var group = "";
        if(group=="Fullaccess")
        {
        API.get('KiddoDCRUD','/KiddoD/ITEMS')
            .then(resp => {
                
                this.setState({
                    data: resp,
                    loading: false
                });
                console.log(resp);
            })
            .catch (err => console.log(err));
        }
        
        else{
           let req = {
                headers: {'content-type': 'application/json'},
                body : {
                    id: cognitoUser,
                    userId: cognitoID
                    
                }
            };

            API.post('KiddoDCRUD','/KiddoD/USER/',req)
            .then(resp => {
                var array1=[];
                array1.push(resp);
                this.setState({
                    data: array1,
                    loading: false
                });
                console.log(resp);
            })
            .catch (err => console.log(err));
        //}
    }

}

    render() {
        console.log('data:' + JSON.stringify(this.state.data));
        return (                              
            <div className="content">
                <h4>Load the user details</h4>
                <div className="content-button">
                    <Button primary onClick={this.fetch}>
                        List user information
                    </Button>                                                      
                </div>
                <TableContent tableData={this.state.data} loading={this.state.loading} />
                <div>
				
			   </div>
                                                            
            </div>
           
                 
        );
    }
    
}
