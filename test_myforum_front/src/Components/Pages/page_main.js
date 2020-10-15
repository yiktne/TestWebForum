import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {setUserToken} from '../../Store/client';

class PageMain extends Component {
    idInput = '';
    pwInput = '';

    state = {

    }

    render() {
        
        if(this.props.userToken !== '') {
            alert('이미 로그인하였습니다.');
        }

        return (
            <div>
                Welcome!<br/>
                ID : <input type="text" ref={ref => this.idInput = ref}/><br/>
                PW : <input type="password" ref={ref => this.pwInput = ref}/><br/>
                <input type='button' value="login" onClick={this.handleLogin}/><br/>
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
            alert('PW를 입력해주세요')
            return;
        }

        const response = await axios.post(this.props.serverURL + '/signin', {userID:this.idInput.value, password:this.pwInput.value}).catch((err) => {
            console.log(err.response.data);
        });

        if(response !== undefined) {
            console.log(response);
            this.props.setUserToken(response.data.token);
            this.props.history.push('/list');
        }
    }
}

const mapStateToProps = ({client}) => ({
    serverURL:client.serverURL,
    userToken: client.userToken
});

const mapDispatchToProps = {setUserToken};

export default connect(mapStateToProps, mapDispatchToProps)(PageMain);