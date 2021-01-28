import React, {Component} from 'react';
import {connect} from 'react-redux';

var axios = require('axios');

const ERR_PWCHECK_FAILED = 1;
const ERR_VALUE_NULL = 2;
const ERR_ID_ALREADY_USED = 3;

class PageRegister extends Component {
    
    state = {
        errorCode:0,
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
            this.setState({errorCode:ERR_VALUE_NULL});
        } else if(this.pw.value !== this.pw_re.value) {
            this.setState({errorCode:ERR_PWCHECK_FAILED});
        } else {
            const response = await axios.post(this.props.serverURL + "/signup", {userID: this.id.value, password:this.pw.value, nickname:this.nickname.value}).catch((err) => {
                if (err.response) {
                    if(err.response.data) {
                        switch(err.response.data.code) {
                            case 100:
                            case 101:
                            case 102:
                                this.setState({errorCode:ERR_VALUE_NULL});
                                break;
                            case 201:
                                this.setState({errorCode:ERR_ID_ALREADY_USED});
                                break;
                            default:
                                break;
                        }
                    }
                }
            });

            if(response !== undefined) {
                alert('가입에 성공하였습니다.');
                this.props.history.push('/');
            }
        }
    }

    renderErrorMessage() {
        var result = (<label></label>);
        if(this.state.errorCode === ERR_VALUE_NULL) {
            result = (<label style={{"color":"red"}}>비어있는 값을 입력해주세요.</label>);
        } else if (this.state.errorCode === ERR_PWCHECK_FAILED){
            result = (<label style={{"color":"red"}}>비밀번호 재입력이 맞지 않습니다.</label>);
        } else if(this.state.errorCode === ERR_ID_ALREADY_USED) {
            result = (<label style={{"color":"red"}}>이미 존재하는 ID입니다. 다른 ID를 입력해주세요.</label>);
        }

        return result;
    }
}

const mapStateToProps = ({client}) => ({
    serverURL:client.serverURL
});

export default connect(mapStateToProps)(PageRegister);