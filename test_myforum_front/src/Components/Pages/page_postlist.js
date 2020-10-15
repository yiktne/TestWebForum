import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import PostList from '../Form/form_postlist';
import client from '../../Store/client';

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
                <PostList posts={this.state.posts} />
                <input type='button' value='작성하기' onClick={this.handlePost}/>
            </div>
        );
    }

    handlePost = () => {
        console.log(this.props.userToken);
        axios.post(this.props.serverURL + '/post', {title:'테스트입니다', content:'테스트 게시글입니다.', userToken:this.props.userToken})
    }
}

const mapStateToProps = ({client}) => ({
    serverURL: client.serverURL,
    userToken: client.userToken,
});

export default connect(mapStateToProps)(PagePostList);