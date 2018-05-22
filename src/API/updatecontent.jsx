import React from 'react';
import {API} from 'aws-amplify';
import App from '../App.js';
import data from '../data.json';
import {reactLocalStorage} from 'reactjs-localstorage';
class updatecontent extends React.Component {
    constructor() {
        super();
        this.state = {
        };
       /* setInterval(function(){ const user= reactLocalStorage.get('CognitoIdentityServiceProvider.7qahll9gdvm1j1i0ani4764ehh.LastAuthUser', true);
        const userID=reactLocalStorage.get('aws.cognito.identity-id.ap-south-1:014d4099-c84e-4bb4-9250-696cda5f7013',true);
        console.log(userID);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+':'+ today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();        
        console.log(user+ date);
        let req = {
            headers: {'content-type': 'application/json'},
            body : {
                key:{
                    userId:userID,
                    id:user
                },
                "HeartRate":data.HeartRate,
                "skintemp":data.skintemp,
                "steps":data.steps,
                "activity":data.activity,
                "gst":data.gst,
                "Updateddate":date
            }
        }
        API.post('KiddoDCRUD','/KiddoD/updateCRON',req)
            .then(data => {
                alert('Successfully updated Latest records');
                this.setState({
                    data: data,
                    loading: false
                });
            })
            .catch (err => console.log(err));
            console.log(req);}, 21600000);*/
}

    

    handleData = (event) => {
        const user= reactLocalStorage.get('CognitoIdentityServiceProvider.7qahll9gdvm1j1i0ani4764ehh.LastAuthUser', true);
        const userID=reactLocalStorage.get('aws.cognito.identity-id.ap-south-1:014d4099-c84e-4bb4-9250-696cda5f7013',true);
        console.log(userID);
        event.preventDefault();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+':'+ today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();        
        console.log(user+ date);
        let req = {
            headers: {'content-type': 'application/json'},
            body : {
                key:{
                    userId:userID,
                    id:user
                },
                "HeartRate":data.HeartRate,
                "skintemp":data.skintemp,
                "steps":data.steps,
                "activity":data.activity,
                "gst":data.gst,
                "Updateddate":date
            }
        }
        API.post('KiddoDCRUD','/KiddoD/updateCRON',req)
            .then(data => {
                alert('Successfully updated Latest records');
                this.setState({
                    data: data,
                    loading: false
                });
            })
            .catch (err => console.log(err));
            console.log(req);
    }

    render() {
        console.log(this.props);
        return(
            <form onSubmit={this.handleData}>
            <br></br>
            <br></br>
                <input type="submit" value="Updatedata" />
            </form>
        )
    }
}
export default updatecontent;