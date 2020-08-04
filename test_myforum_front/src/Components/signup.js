import React, {Component} from 'react';

var axios = require('axios');

class SignUp extends Component {
    render() {
        return (
            <div>
                <input type="button" value="테스트" onClick={(this.myTempMethod)}/>
            </div>
        );
    }

    myTempMethod = async () => {
        console.log("start");

        const response = await axios.post(this.props.serverURL + "/signup", {userID: "test", password:"test", nickname:"test"});

        console.log(response);
    }
}

export default SignUp;