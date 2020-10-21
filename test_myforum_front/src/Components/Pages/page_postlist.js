import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

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
                <PostList posts={this.state.posts} />
                <input type='button' value='작성하기' onClick={this.handlePost}/>
            </div>
        );
    }

    handlePost = () => {
        this.props.history.push('/post');
    }
}

const mapStateToProps = ({client}) => ({
    serverURL: client.serverURL,
});

export default connect(mapStateToProps)(PagePostList);