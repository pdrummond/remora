import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import "./MarkdownContent.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { NotFoundPage } from "./NofFoundPage";
import { HomePage } from "./HomePage";
import { PostPage } from "./PostPage";
import { NewPostPage } from "./NewPostPage";

Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/new" component={NewPostPage} />
        <Route path="/post/:postId" component={PostPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"]
  }
});
