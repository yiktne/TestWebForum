import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {setLastPage} from '../../Store/post';
import PostList from '../Form/form_postlist';

class PagePostList extends Component {

    pageDiv = 10;

    state = {
        maxPage:1,
        pagePost:10,
        posts:[],
    }

    componentDidMount() {
        axios.get(this.props.serverURL + '/getPagePost').then((res) => {
            this.setState({...this.state, pagePost:res.data.count});
        });
        axios.get(this.props.serverURL + '/getPage').then((res) => {
            this.setState({...this.state, maxPage:res.data.count});
        });
        this.updatePagePost(this.props.match.params.page);
    }

    updatePagePost(page) {
        axios.get(this.props.serverURL + '/getPage/' + page).then((res) => {
            this.setState({...this.state, posts:res.data});
        });
    }

    render() {
        return (
            <div>
                <PostList posts={this.state.posts} eventOpenPost={this.handleOpenPost} />
                {this.renderPageList()}
                <br/>
                <input type='button' value='작성하기' onClick={this.handlePost}/>
            </div>
        );
    }

    renderPageList = () => {
        var element = [];

        var style = {color:'blue', textDecoration:'underline', cursor:'pointer', padding:"1px"};

        var currPageDiv = parseInt((this.props.match.params.page - 1) / 10);
        
        if(currPageDiv > 0) {
            element.push(<a key="prev" style={style} onClick={() => {this.handleChangePage({target:{innerHTML:currPageDiv * 10}})}}>◀︎</a>);
        }

        var max = (currPageDiv + 1) * 10;

        if(this.state.maxPage < max) {
            max = this.state.maxPage;
        }

        for(var i = 1 + (currPageDiv * 10); i <= max; i++) {
            element.push((<a key={i} style={style} onClick={this.handleChangePage}>{i}</a>))
        }

        if(currPageDiv < parseInt((this.state.maxPage - 1) / 10)) {
            element.push(<a key="next" style={style} onClick={() => {this.handleChangePage({target:{innerHTML:(currPageDiv + 1) * 10 + 1}})}}>▶︎</a>);
        }

        return element;
    }

    handlePost = () => {
        this.props.setLastPage(this.props.match.params.page);
        this.props.history.push('/post');
    }

    handleOpenPost = (id) => {
        this.props.setLastPage(this.props.match.params.page);
        this.props.history.push('/detail/' + id);
    }
    
    handleChangePage = (event) => {
        this.props.history.push('/list/' + event.target.innerHTML);
        this.updatePagePost(event.target.innerHTML);
    }
}

const mapStateToProps = ({client}) => ({
    serverURL: client.serverURL,
});

const mapDispatchToProps = {setLastPage};

export default connect(mapStateToProps, mapDispatchToProps)(PagePostList);