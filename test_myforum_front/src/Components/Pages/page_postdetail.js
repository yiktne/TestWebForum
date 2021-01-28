import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import axios from 'axios';

class PagePostDetail extends Component {

    commentContent = React.createRef();

    state = {
        comments:[],
    }

    componentDidMount() {
        axios.get(this.props.serverURL + "/getComments/" + this.props.currPost).then((res) => {
            this.setState({...this.state, comments:res.data});
            console.log(res)
        });
    }

    render() {

        if(this.props.currPost === null) {
            console.log(this.props.id);
            // 데이터 받아오기
            return (<div></div>)
        } else {
            let commentTag = [];
            for(var i = 0; i < this.state.comments.length; i++) {
                commentTag.push(<tr><td>{this.state.comments[i].userID}<br/>{this.state.comments[i].content}</td></tr>);
            }
            console.log(this.props.currPost);
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>제목</td>
                                <td><input type="text" value={this.props.currPost.title} readOnly/></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>내용</td>
                                <td><textarea value={this.props.currPost.content} readOnly/></td>
                            </tr>
                            <tr>
                                <td colSpan="2">댓글</td>
                            </tr>
                            {commentTag}
                            <tr>
                                <td colSpan="2">
                                    <input type="text" ref={this.commentContent}/>  
                                    <input type="button" value="댓글달기" onClick={this.handleSendComment}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    handleSendComment = () => {
        console.log(this.props.cookies)
        axios.post(this.props.serverURL + "/comment", {postID:this.props.currPost, content:this.commentContent.current.value, userToken:this.props.cookies.get("userToken")}).then((res) => {
            console.log(res)
        })
    }
}

const mapStateToProps = ({client, post}) => ({
    currPost:post.currPost,
    serverURL:client.serverURL
});

export default connect(mapStateToProps)(withCookies(PagePostDetail));