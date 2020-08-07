import React, {Component} from 'react';

var axios = require('axios');

class SignUp extends Component {
    
    state = {
        isValueNull:false,
        isPasswordNotEqual:false,
        isAlreadyMakedID:false,
        isServerError:false
    }

    id = null;
    nickname = null;
    pw = null;
    pw_re = null;

    componentDidCatch(error, errorInfo) {
        
        console.log(error, errorInfo);
      }

    render() {
        return (
            <div>
                ID <input type="text" ref={ref => {this.id = ref}}/><br/>
                닉네임 <input type="text" ref={ref => {this.nickname = ref}}/><br/>
                비밀번호 <input type="password" ref={ref => {this.pw = ref}}/><br/>
                비밀번호 재입력 <input type="password" ref={ref => {this.pw_re = ref}}/><br/>
                <input type="button" value="가입하기" onClick={(this.myTempMethod)}/><br/>
                {this.renderErrorMessage()}
            </div>
        );
    }

    myTempMethod = async () => {
        if(this.id.value === "" || this.nickname.value === "" || this.pw.value === "" || this.pw_re.value === "") {
            this.setState({isValueNull:true});
        } else if(this.pw.value !== this.pw_re.value) {
            this.setState({isValueNull:false, isPasswordNotEqual:true});
        } else {

            const response = await axios.post(this.props.serverURL + "/signup", {userID: this.id.value, password:this.pw.value, nickname:this.nickname.value}).catch(function(err) {
                if (err.response) {
                    if(err.response.data) {
                        this.setState
                    }
                  } else {

                  }
            });

            console.log(response);
        }
    }

    renderErrorMessage() {
        var result = (<label></label>);
        if(this.state.isValueNull) {
            result = (<label style={{"color":"red"}}>비어있는 값을 입력해주세요.</label>);
        } else if (this.state.isPasswordNotEqual){
            result = (<label style={{"color":"red"}}>비밀번호 재입력이 맞지 않습니다.</label>);
        } else if(this.state.isAlreadyMakedID) {
            result = (<label style={{"color":"red"}}>이미 존재하는 ID입니다. 다른 ID를 입력해주세요.</label>);
        }

        return result;
    }
}

export default SignUp;