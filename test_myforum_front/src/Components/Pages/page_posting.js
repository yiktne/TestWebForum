import React, {Component} from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import EditPost from '../Form/form_editpost';

const ERR_TITLE_NULL = 100;
const ERR_CONTENT_NULL = 101;
const ERR_USERTOKEN_NULL = 102;

class PagePosting extends Component {
    
    render() {
        return (
            <EditPost eventPosting={this.handlePosting}/>
        );
    }

    handlePosting = (title, content) => {
        axios.post(this.props.serverURL + '/post', {title, content, userToken:this.props.cookies.get("userToken")}).then((res) => {
            if(res.data !== undefined) {
                alert("게시하였습니다.");
                // 이후 작성한 게시글로 이동하기
                this.props.history.push('/list');
            }
        }).catch((err) => {
            if(err.response.data !== undefined) {
                if(err.response.data.code === ERR_TITLE_NULL) {
                    alert("제목을 입력해주세요.");
                } else if(err.response.data.code === ERR_CONTENT_NULL) {
                    alert("내용을 입력해주세요.");
                } else if(err.response.data.code === ERR_USERTOKEN_NULL) {
                    alert("인증이 만료되었습니다. 다시 로그인해주세요.");
                    this.props.history.push('/');
                }
            }
        });
    }
}

const mapStateToProps = ({client}) => ({
    serverURL: client.serverURL,
});

export default connect(mapStateToProps)(withCookies(PagePosting));