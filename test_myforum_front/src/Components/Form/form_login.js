import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';

class LoginForm extends Component {

    idInput = React.createRef();
    pwInput = React.createRef();
    
    render() {
        if(this.props.cookies.get("userToken") !== undefined) {
            return this.renderLogout();
        } else {
            return this.renderLogin();
        }
    }

    renderLogout() {
        return (
            <div>
                Welcome!
                <input type='button' value="logout" onClick={this.handleLogout}/>
            </div>
        )
    }

    renderLogin() {
        return (
            <div>
                아이디 : <input type="text" ref={this.idInput}/>
                비밀번호 : <input type="password" ref={this.pwInput}/>
                <input type='button' value="로그인" onClick={this.handleLogin}/>
                <Link to='/register'>register</Link>
            </div>
        );
    }

    handleLogin = async () => {
        if(this.idInput.value === '') {
            alert('ID를 입력해주세요');
            return;
        }

        if(this.pwInput.value === '') {
            alert('비밀번호를 입력해주세요')
            return;
        }

        const response = await axios.post(this.props.serverURL + '/signin', {userID:this.idInput.current.value, password:this.pwInput.current.value}).catch((err) => {
            console.log(err.response.data);
        });

        if(response !== undefined) {
            console.log(response);
            axios.defaults.headers.common['token'] = `Bearer ${response.data.token}`;
            this.props.cookies.set('userToken', response.data.token, {maxAge:3600*24});
        }
    }

    handleLogout = () => {
        this.props.cookies.remove("userToken");
        alert("로그아웃 하였습니다.");
    }
}

const mapStateToProps = ({client}) => ({
    serverURL:client.serverURL,
});

export default connect(mapStateToProps)(withCookies(LoginForm));