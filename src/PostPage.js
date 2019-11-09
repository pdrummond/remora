import React from "react";
import styled from "styled-components";
import { useQuery } from "./useQuery";
import { useHistory, useParams } from "react-router-dom";
import { getPostErrorMessage } from "./error-utils";
import Button from "react-bootstrap/Button";
import { MessageBox } from "./MessageBox";
import { PostEditor } from "./PostEditor";
import { Markdown } from "./Markdown";
import { MessageHistory } from "./MessageHistory";

const Container = styled.div`
  display: flex;
  grid-area: post;
  height: 100vh;
  overflow: auto;
  transition: opacity 0.1s ease-in;
  opacity: ${props => (props.show ? 1 : 0)};
`;

const PostTitle = styled.div`
  grid-area: header;
  height: 40px;
  font-size: 26px;
  color: #1c1c1c;
`;

const Msg = styled.div`
  padding: 20px;
  font-size: 18px;
  color: grey;
`;

const PostContent = styled.div`
  font-size: 18px;
  margin-top: 10px;
  border-bottom: 1px solid whitesmoke;
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

const BackButton = styled.div`
  position: absolute;
  top: 0px;
  left: 10px;
`;

const Body = styled.div`
  width: 70%;
  margin: 10px auto;
  padding: 20px;
`;
const Sidebar = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  height: 100vh;
  background-color: #f7f9fa;
  border-left: 1px solid #e6ecef;
  width: 50%;
  padding: 10px;
  z-index: 1;
`;

const EditButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const BottomAnchor = styled.div`
  height: 100px;
`;

export function PostPage() {
  const [oldestMessagesLimit, setOldestMessagesLimit] = React.useState(30);
  const bottomAnchor = React.useRef();
  const history = useHistory();
  const { postId } = useParams();
  const [showEditor, setShowEditor] = React.useState(false);
  const postQuery = useQuery(GET_POST_QUERY, { postId });
  const messagesQuery = useQuery(GET_MESSAGES_QUERY, {
    postId,
    oldestMessagesLimit
  });

  const loadMoreMessages = () => {
    const newLimit = oldestMessagesLimit + oldestMessagesLimit;
    messagesQuery.refetch({
      postId,
      oldestMessagesLimit: newLimit
    });
    setOldestMessagesLimit(newLimit);
  };

  return (
    <Container data-testid="Post" show={!messagesQuery.loading}>
      <Body>
        {!showEditor && (
          <BackButton>
            <Button
              variant="link"
              onClick={() => {
                history.push("/");
              }}
            >
              Back
            </Button>
          </BackButton>
        )}
        {!postQuery.loading && postQuery.error && (
          <Msg>
            Error: <b>{getPostErrorMessage(postQuery)}</b>
          </Msg>
        )}
        <PostTitle>{!postQuery.loading && postQuery.data.post.title}</PostTitle>
        <PostContent>
          {!postQuery.loading && (
            <Markdown content={postQuery.data.post.content} />
          )}
        </PostContent>
        <EditButton>
          <Button onClick={() => setShowEditor(true)}>Edit</Button>
        </EditButton>
        <MessageHistory
          messagesQuery={messagesQuery}
          onMoreMessagesClicked={loadMoreMessages}
        />
        <MessageBox
          onMessageAdded={() => {
            messagesQuery.refetch({
              postId,
              oldestMessagesLimit,
              onCompleteQuery() {
                bottomAnchor.current.scrollIntoView();
              }
            });
          }}
        />
        <BottomAnchor ref={bottomAnchor} />
      </Body>
      {showEditor && !postQuery.loading && (
        <Sidebar>
          <PostEditor
            post={postQuery.data.post}
            onPostSaved={() => {
              postQuery.refetch();
              setShowEditor(false);
            }}
            onCancelled={() => {
              setShowEditor(false);
            }}
          />
        </Sidebar>
      )}
    </Container>
  );
}

const GET_POST_QUERY = `query getMessages($postId:ID!) {
  post: getPost(id:$postId) {      
      id
      title
      owner
      content
      participants
      createdAt
  }
}`;

/*
  For pagination to work, the limit for the newestMessages must always be 
  one higher than the limit for oldestMessages. See docs for 
  parsePostQueryForMessages.js for more info about pagination.
*/
const GET_MESSAGES_QUERY = `query getMessages($postId:ID!, $oldestMessagesLimit:Int!) {
  messages: getPost(id:$postId) {      
      id    
      oldestMessages: messages(limit:$oldestMessagesLimit, sortDirection:ASC) {
        items {
          id          
          type
          owner
          createdAt
          content
          post {
            id
          }
        }
      }
      newestMessages: messages(limit:31, sortDirection:DESC) {
        items {
          id          
          type
          owner
          createdAt
          content
          post {
            id
          }
        }
      }        
    }
  }`;
