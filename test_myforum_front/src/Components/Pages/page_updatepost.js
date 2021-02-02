import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';
import EditPost from '../Form/form_editpost';
import axios from 'axios';

class PageUpdatePost extends Component {

    editRef = React.createRef();

    componentDidMount() {
        for(let post in this.props.posts) {
            if(this.props.posts[post].postID == this.props.match.params.id) {
                this.editRef.current.setTitle(this.props.posts[post].title);
                this.editRef.current.setContent(this.props.posts[post].content);
                break;
            }
        }
    }

    render() {
        return (
            <EditPost eventPosting={this.handleUpdate} ref={this.editRef}/>
        )
    }

    handleUpdate = (title, content) => {
        axios.put(this.props.serverURL + "/updatePost", {postID:this.props.match.params.id, title, content, userToken:this.props.cookies.get("userToken")}).then((result) => {
            if(result.data.result) {
                alert("수정하였습니다.");
                this.props.history.push("/detail/" + this.props.match.params.id);
            }
        });
    }
}

const mapStateToProps = ({client, post}) => ({
    posts:post.posts,
    serverURL:client.serverURL
});

export default connect(mapStateToProps)(withCookies(PageUpdatePost));