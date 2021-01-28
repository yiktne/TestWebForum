import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { withCookies } from 'react-cookie';

class PageMain extends Component {
    idInput = '';
    pwInput = '';

    state = {

    }

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
                Welcome!<br/>
                <input type='button' value="logout" onClick={this.handleLogout}/><br/>
            </div>
        )
    }

    renderLogin() {
        return (
            <div>
                Welcome!<br/>
                아이디 : <input type="text" ref={ref => this.idInput = ref}/><br/>
                비밀번호 : <input type="password" ref={ref => this.pwInput = ref}/><br/>
                <input type='button' value="로그인" onClick={this.handleLogin}/><br/>
                <Link to='/register'>register</Link><br/>
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

        const response = await axios.post(this.props.serverURL + '/signin', {userID:this.idInput.value, password:this.pwInput.value}).catch((err) => {
            console.log(err.response.data);
        });

        if(response !== undefined) {
            console.log(response);
            axios.defaults.headers.common['token'] = `Bearer ${response.data.token}`;
            this.props.cookies.set('userToken', response.data.token, {maxAge:3600*24});
            this.props.history.push('/list');
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

export default connect(mapStateToProps)(withCookies(PageMain));