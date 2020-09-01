import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import User from './page/User/User';
import Comment from './page/Comment/Comment';
import Post from './page/Post/Post';
import Tag from './page/Tag/Tag';
import AppBarComponent from './component/AppBar/AppBarComponent';

import History from './component/History/History';


function App() {

  return (
    <Router history={History}>
      <Switch>
        <Route exact path="/" name="User" component={User} />
        <Route exact path="/user" name="User" component={User} />
        <Route exact path="/comment" name="Comment" component={Comment} />
        <Route exact path="/post" name="Post" component={Post} />
        <Route exact path="/tag" name="Tag" component={Tag} />
      </Switch>
    </Router>

    // <AppBarComponent />
  );
}

export default withRouter(App);
