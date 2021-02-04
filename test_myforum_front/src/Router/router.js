import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import LoginForm from '../Components/Form/form_login';

import MainPage from '../Components/Pages/page_main';
import Register from '../Components/Pages/page_register';
import PostList from '../Components/Pages/page_postlist';
import PostDetail from '../Components/Pages/page_postdetail';
import Posting from '../Components/Pages/page_posting';
import UpdatePost from '../Components/Pages/page_updatepost';

class RouterMain extends Component {
    render() {
        return (
            <Router>
                <LoginForm />
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/list/:page" component={PostList} />
                    <Route exact path="/detail/:id" component={PostDetail} />
                    <Route exact path="/post" component={Posting}/>
                    <Route exact path="/update/:id" component={UpdatePost}/>
                </Switch>
            </Router>
        );
    }
}

export default withCookies(RouterMain);