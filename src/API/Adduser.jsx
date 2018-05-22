import React from 'react';
//import { Button, Image } from 'semantic-ui-react';
import {API} from 'aws-amplify';
import App from '../App.js';
import {reactLocalStorage} from 'reactjs-localstorage';
class Adduser extends React.Component {
    constructor() {
        super();
        this.state = {
            userID: '',
            userName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event, key) => {
        this.setState({
            [key]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+':'+ today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        const user= reactLocalStorage.get('CognitoIdentityServiceProvider.7qahll9gdvm1j1i0ani4764ehh.LastAuthUser', true);
        console.log(user+ date);
        const {userID, userName} = this.state;
        let req = {
            headers: {'content-type': 'application/json'},
            body : {
                'user': user,
                'userName':userName,
                'userId':userID,
                'date':date
            }
        }
        API.post('KiddoDCRUD','/KiddoD/PUT',req)
            .then(data => {
                alert('Successfully insert kid record into the DB');
                this.setState({
                    data: data,
                    loading: false
                });
            })
            .catch (err => console.log(err));
    }

    render() {
        console.log(this.props);
        return(
            <form onSubmit={this.handleSubmit}>
                <br></br>
                <br></br>
                 DOB    :<input type='text' value={this.state.userID} onChange={(e) => this.handleChange(e, 'userID')} /> <br></br>
                <br></br>
                 Full NAME  :<input type='text' value={this.state.userName} onChange={(e) => this.handleChange(e, 'userName')}/>
                <br></br>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
export default Adduser;