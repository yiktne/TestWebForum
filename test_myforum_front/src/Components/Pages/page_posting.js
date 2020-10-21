import React, {Component} from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';

const ERR_TITLE_NULL = 100;
const ERR_CONTENT_NULL = 101;
const ERR_USERTOKEN_NULL = 102;

class PagePosting extends Component {
    
    title = React.createRef();
    content = React.createRef();

    render() {
        return (
            <div>
                <table>
                <thead>
                    <tr>
                        <td>제목</td>
                        <td><input type="text" ref={this.title}/></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>내용</td>
                        <td><textarea ref={this.content}/></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><input type="button" value="작성하기" onClick={this.handlePosting}/></td>
                    </tr>
                </tbody>
                </table>
            </div>
        );
    }

    handlePosting = () => {
        axios.post(this.props.serverURL + '/post', {title:this.title.current.value, content:this.content.current.value, userToken:this.props.cookies.get("userToken")}).then((res) => {
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