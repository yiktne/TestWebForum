import React, {Component} from 'react';

class EditPost extends Component {

    titleRef = React.createRef();
    contentRef = React.createRef();

    render() {
        return (
            <div>
                <table>
                <thead>
                    <tr>
                        <td>제목</td>
                        <td><input type="text" ref={this.titleRef}/></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>내용</td>
                        <td><textarea ref={this.contentRef}/></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><input type="button" value="작성완료" onClick={this.handlePosting}/></td>
                    </tr>
                </tbody>
                </table>
            </div>
        );
    }

    setTitle(title) {
        this.titleRef.current.setAttribute("value", title);
    }

    setContent(content) {
        this.contentRef.current.innerHTML = content;
    }

    handlePosting = () => {
        this.props.eventPosting(this.titleRef.current.value, this.contentRef.current.value);
    }
}

export default EditPost;