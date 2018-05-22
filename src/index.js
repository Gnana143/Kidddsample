import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  AWS  from 'aws-sdk';
import App from './App';
import { withAuthenticator } from 'aws-amplify-react';
import registerServiceWorker from './registerServiceWorker';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
var params = {
    DestinationUser: { /* required */
      ProviderAttributeName: 'email',
      ProviderAttributeValue: 'deepu.gnana2@gmail.com' ,
      ProviderName: 'Cognito '
    },
    SourceUser: { /* required */
      ProviderAttributeName: 'email',
      ProviderAttributeValue: 'deepu.gnana2@gmail.com',
      ProviderName: 'Facebook'
    },
    UserPoolId: 'ap-south-1_WZAaIkFln' /* required */
  };
 // AWS.cognitoidentityserviceprovider.adminLinkProviderForUser(params, function(err, data) {
 //   if (err) console.log(err, err.stack); // an error occurred
 //   else     console.log(data);           // successful response
//  });
const federated = { 
    facebook_app_id: '187522381897605'  
};
const AppWithAuth = withAuthenticator(App);
Amplify.configure(awsmobile);
ReactDOM.render(<AppWithAuth federated={federated}/>, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
