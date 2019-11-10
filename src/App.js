import React from "react";
import Amplify, { Auth } from "aws-amplify";
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
import { useAppContext } from "./useAppContext";

Amplify.configure(awsconfig);

function App() {
  const { appState, setCurrentUser } = useAppContext();
  React.useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      console.log("CURRENT USER:", user);
      setCurrentUser(user);
    };
    getCurrentUser();
  }, [setCurrentUser]);

  if (appState.currentUser) {
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
  } else {
    return null;
  }
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"]
  }
});
