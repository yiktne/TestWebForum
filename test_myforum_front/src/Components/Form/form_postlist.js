import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class PostList extends Component {

    render() {
        return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th colSpan='3'>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                </tbody>
            </table>
        </div>);
    }

    renderList() {
        var result = [];

        console.log(this.props.posts);

        if(this.props.posts.length === 0) {
            result.push((<tr key='nopost'><td colSpan={6}>게시글이 없습니다.</td></tr>));
        } else {
            for(var i = 0; i < this.props.posts.length; i++) {
                result.push((
                    <tr key={this.props.posts[i].postID}>
                        <td>{this.props.posts[i].postID}</td>
                        <td colSpan={3}><Link to='/'>{this.props.posts[i].content}</Link></td>
                        <td>{this.props.posts[i].userName}</td>
                        <td>{this.props.posts[i].date}</td>
                    </tr>
                ));
            }
        }

        return result;
    }
}

export default PostList;