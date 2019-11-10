import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";
import { onCreateMessageInPost } from "./graphql/subscriptions";
import { useAppContext } from "./useAppContext";

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  transition: opacity 0.1s ease-in;
  opacity: ${({ show }) => (show ? 0.9 : 0)};
  cursor: pointer;

  & .alert {
    margin-bottom: 5px;
    z-index: 1;
  }
`;

export function NewMessagesBanner({ postId, onBannerClicked }) {
  const { appState } = useAppContext();
  const [showBanner, setShowBanner] = React.useState(false);
  const [owners, setOwners] = React.useState([]);
  const [numMessages, setNumMessages] = React.useState(0);
  React.useEffect(() => {
    console.log("SETTING UP SUBSCRIPTION");
    const subscription = API.graphql(
      graphqlOperation(onCreateMessageInPost, {
        messagePostId: postId
      })
    ).subscribe(message => {
      console.log("NEW MESSAGE:", message);
      const newMessage = message.value.data.onCreateMessageInPost;
      if (newMessage.owner !== appState.currentUser.username) {
        setShowBanner(true);
        setOwners(owners => Array.from(new Set(owners).add(newMessage.owner)));
        setNumMessages(numMessages => numMessages + 1);
      }
    });
    return () => {
      console.log("UNSUBSCRIBING");
      subscription.unsubscribe();
    };
  }, [appState.currentUser.username, postId]);

  return (
    <Container
      data-testid="NewMessagesBanner"
      show={showBanner}
      onClick={() => {
        setShowBanner(false);
        setOwners([]);
        setNumMessages(0);
        if (onBannerClicked) {
          onBannerClicked();
        }
      }}
    >
      {numMessages === 1 && (
        <Alert variant="success">
          <b>{owners[0]}</b> just added a new message - click here to show
        </Alert>
      )}
      {numMessages > 1 && owners.length === 1 && (
        <Alert variant="success">
          <b>{owners[0]}</b> has added <b>{numMessages}</b> new messages - click
          here to show
        </Alert>
      )}
      {numMessages > 1 && owners.length > 1 && (
        <Alert variant="success">
          There are now <b>{numMessages}</b> new messages - click here to show
        </Alert>
      )}
    </Container>
  );
}
