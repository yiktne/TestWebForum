import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import MainPage from '../Components/Pages/page_main';
import Register from '../Components/Pages/page_register';
import PostList from '../Components/Pages/page_postlist';
import Posting from '../Components/Pages/page_posting';

class RouterMain extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/list" component={PostList} />
                    <Route exact path="/post" component={Posting}/>
                </Switch>
            </Router>
        );
    }
}

export default withCookies(RouterMain);