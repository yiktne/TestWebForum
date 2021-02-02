import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {setPostList} from '../../Store/post';

import PostList from '../Form/form_postlist';

class PagePostList extends Component {

    componentDidMount() {
        axios.get(this.props.serverURL + '/getPosts').then((res) => {
            console.log(res.data);
            this.props.setPostList(res.data);
        });
    }

    render() {
        return (
            <div>
                <PostList posts={this.props.posts} eventOpenPost={this.handleOpenPost} />
                <input type='button' value='작성하기' onClick={this.handlePost}/>
            </div>
        );
    }

    handlePost = () => {
        this.props.history.push('/post');
    }

    handleOpenPost = (id) => {
        this.props.history.push('/detail/' + id);
    }
}

const mapStateToProps = ({client, post}) => ({
    serverURL: client.serverURL,
    posts:post.posts,
});

const mapDispatchToProps = {setPostList};

export default connect(mapStateToProps, mapDispatchToProps)(PagePostList);