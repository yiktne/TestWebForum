import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../Components/Pages/page_main';
import Register from '../Components/Pages/page_register';

class RouterMain extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </Router>
        );
    }
}

export default RouterMain;