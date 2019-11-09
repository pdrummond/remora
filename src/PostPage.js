import React from "react";
import styled from "styled-components";
import { useQuery } from "./useQuery";
import { useHistory, useParams } from "react-router-dom";
import { getPostErrorMessage } from "./error-utils";
import Button from "react-bootstrap/Button";
import { MessageBox } from "./MessageBox";
import { PostEditor } from "./PostEditor";
import { Markdown } from "./Markdown";

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

const Content = styled.div`
  grid-area: content;
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

const Message = styled.div`
  margin-bottom: 10px;
`;

const MessageOwner = styled.span`
  font-weight: bold;
`;
const MessageTimestamp = styled.span`
  margin-left: 5px;
  color: gray;
  font-size: 12px;
`;

const MessageContent = styled.div``;

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

export function PostPage() {
  const history = useHistory();
  const { postId } = useParams();
  const [showEditor, setShowEditor] = React.useState(false);
  const post = useQuery(getPostQuery(), { postId });

  return (
    <Container data-testid="Post" show={!post.loading}>
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
        {!post.loading && post.error && (
          <Msg>
            Error: <b>{getPostErrorMessage(post)}</b>
          </Msg>
        )}
        <PostTitle>{!post.loading && post.data.getPost.title}</PostTitle>
        <PostContent>
          {!post.loading && <Markdown content={post.data.getPost.content} />}
        </PostContent>
        <EditButton>
          <Button onClick={() => setShowEditor(true)}>Edit</Button>
        </EditButton>
        <Content>
          {!post.loading &&
            !post.error &&
            post.data.getPost.messages.items.map(m => {
              return (
                <Message key={m.id}>
                  <MessageOwner>{m.owner}</MessageOwner>
                  <MessageTimestamp>
                    {new Date(m.createdAt).toLocaleString()}
                  </MessageTimestamp>
                  <MessageContent>
                    <Markdown content={m.content} />
                  </MessageContent>
                </Message>
              );
            })}
        </Content>
        <MessageBox onMessageAdded={post.refetch} />
      </Body>
      {showEditor && !post.loading && (
        <Sidebar>
          <PostEditor
            post={post.data.getPost}
            onPostSaved={() => {
              post.refetch();
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

function getPostQuery(messageLimit = 10, messageNextToken = undefined) {
  return `query getPost($postId:ID!) {
    getPost(id:$postId) {      
        id
        title
        owner
        content
        participants
        createdAt
        messages {
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
}

/*
messages(
          limit: ${messageLimit},
          sortDirection: ASC,
          ${messageNextToken ? `nextToken:"${messageNextToken}"` : ``}
        )
        */
