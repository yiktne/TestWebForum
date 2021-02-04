import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PageMain extends Component {

    componentDidMount() {
        this.props.history.push('/list/1');
    }
    
    render() {
        return (<div></div>);
    }
}

export default PageMain;