import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import axios from 'axios';

class PagePostDetail extends Component {

    commentContent = React.createRef();

    state = {
        postData:{},
        comments:[],
        postOwner:false,
    }
    
    componentDidMount() {
        this.updatePostData(this.props.match.params.id);

        window.addEventListener("popstate", this.eventPathChanged);
    }

    componentWillUnmount() {
        window.removeEventListener("popstate", this.eventPathChanged);
    }

    eventPathChanged = () => {
        this.updatePostData(this.props.match.params.id);
    }

    render() {
        if(this.state.postData === {}) {
            // 데이터 받아오기
            return (<div></div>)
        } else {
            let commentTag = [];
            for(var i = 0; i < this.state.comments.length; i++) {
                commentTag.push(<tr key={i}><td>{this.state.comments[i].userID}<br/>{this.state.comments[i].content}</td></tr>);
            }
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>제목</td>
                                <td>{this.state.postData.title}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>작성자</td>
                                <td>{this.state.postData.userName}</td>
                            </tr>
                            <tr>
                                <td>내용</td>
                                <td>{this.state.postData.content}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input type="button" value="목록으로" onClick={this.handlePostList}/>
                                    {this.state.postData.nextPost !== undefined ? (<input type="button" value="다음글" onClick={this.handleNextPost}/>) : ""}
                                    {this.state.postData.prevPost !== undefined ? (<input type="button" value="이전글" onClick={this.handlePrevPost}/>) : ""}
                                    {this.state.postOwner ? (<input type="button" value="수정하기" onClick={this.handleUpdatePost}/>) : ""}
                                    {this.state.postOwner ? (<input type="button" value="삭제하기" onClick={this.handleRemovePost}/>) : ""}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">댓글 ({commentTag.length})</td>
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
        axios.post(this.props.serverURL + "/comment", {postID:this.props.match.params.id, content:this.commentContent.current.value, userToken:this.props.cookies.get("userToken")}).then((res) => {
            alert("댓글을 달았습니다.");
            this.setState({...this.state, comments:this.state.comments.concat(res.data.comment)});
            this.commentContent.current.value = "";
        })
    }

    handlePostList = () => {
        this.props.history.push('/list/' + this.props.page);
    }

    handlePrevPost = () => {
        this.updatePostData(this.state.postData.prevPost);
        this.props.history.push('/detail/' + this.state.postData.prevPost);
    }

    handleNextPost = () => {
        this.updatePostData(this.state.postData.nextPost);
        this.props.history.push('/detail/' + this.state.postData.nextPost);
    }

    handleUpdatePost = () => {
        this.props.history.push('/update/' + this.props.match.params.id);
    }

    handleRemovePost = () => {
        if(window.confirm("정말로 삭제하시겠습니까?")) {
            axios.delete(this.props.serverURL + "/deletePost/" + this.props.match.params.id + "/" + this.props.cookies.get("userToken")).then((res) => {
                if(res.data.result) {
                    alert("삭제되었습니다.");
                    this.props.history.push('/list/' + this.props.page);
                } else {
                    alert("글 삭제에 실패하였습니다.");
                }
            });
        }
    }

    updatePostData = (postID) => {
        axios.get(this.props.serverURL + "/getPost/" + postID).then((res) => {
            this.setState({...this.state, postData:res.data});
        });

        axios.get(this.props.serverURL + "/getComments/" + postID).then((res) => {
            this.setState({...this.state, comments:res.data});
        });

        axios.get(this.props.serverURL + "/isPostOwner/" + postID + "/" + this.props.cookies.get("userToken")).then((res) => {
            this.setState({...this.state, postOwner:res.data.result})
        });
    }
}

const mapStateToProps = ({client, post}) => ({
    serverURL:client.serverURL,
    page:post.lastPage,
});

export default connect(mapStateToProps)(withCookies(PagePostDetail));