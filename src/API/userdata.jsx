import React from 'react';
//import { Button, Image } from 'semantic-ui-react';
import {API} from 'aws-amplify';
import App from '../App.js';
import {reactLocalStorage} from 'reactjs-localstorage';
class userdata extends React.Component {
    constructor() {
        super();
        this.state = {
            Height : '',
            weight: '',
            Rate:''
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
        const user= reactLocalStorage.get('CognitoIdentityServiceProvider.7qahll9gdvm1j1i0ani4764ehh.LastAuthUser', true);
        var tok='CognitoIdentityServiceProvider.7qahll9gdvm1j1i0ani4764ehh.'+user+'.idToken';
        const Token= reactLocalStorage.get(tok, true);
        var playload = JSON.parse(atob(Token.split('.')[1]));
        var user_id= playload.sub;
        event.preventDefault();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+':'+ today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();        
        console.log(user+ date);
        const {Height, Weight, Rate} = this.state;
        let req = {
            headers: {'content-type': 'application/json'},
            body : {
                key:{
                    userId:user_id,
                    id:user
                },

                'rate': Rate,
                'height':Height,
                'weight':Weight,
                'date':date
            }
        }
        API.post('KiddoDCRUD','/KiddoD/UPDATE',req)
            .then(data => {
                alert('Successfully updated KID information into the DB');
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
                 Height    :<input type='text' value={this.state.Height} onChange={(e) => this.handleChange(e, 'Height')} /> <br></br>
                <br></br>
                 Weight  :<input type='text' value={this.state.Weight} onChange={(e) => this.handleChange(e, 'Weight')}/>
                <br></br>
                <br></br>
                 Rate  :<input type='text' value={this.state.Rate} onChange={(e) => this.handleChange(e, 'Rate')}/>
                <br></br>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
export default userdata;