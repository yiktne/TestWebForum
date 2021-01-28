import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {setCurrPost} from '../../Store/post';

import PostList from '../Form/form_postlist';

class PagePostList extends Component {

    state = {
        posts:[]
    }

    componentDidMount() {
        axios.get(this.props.serverURL + '/getPosts').then((res) => {
            console.log(res);
            this.setState({posts:res.data});
        });
    }

    render() {
        return (
            <div>
                <PostList posts={this.state.posts} eventOpenPost={this.handleOpenPost} />
                <input type='button' value='작성하기' onClick={this.handlePost}/>
            </div>
        );
    }

    handlePost = () => {
        this.props.history.push('/post');
    }

    handleOpenPost = (id) => {
        let data = null;
        for(let post in this.state.posts) {
            if(this.state.posts[post].postID === id) {
                data = this.state.posts[post];
                break;
            }
        }

        this.props.setCurrPost(id);
        this.props.history.push('/detail/' + id);
    }
}

const mapStateToProps = ({client}) => ({
    serverURL: client.serverURL,
});

const mapDispatchToProps = {setCurrPost}

export default connect(mapStateToProps, mapDispatchToProps)(PagePostList);