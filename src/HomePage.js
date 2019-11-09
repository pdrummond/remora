import React from "react";
import { Sidebar } from "./Sidebar";
import styled from "styled-components";
import { useQuery } from "./useQuery";
import { PostItem } from "./PostItem";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Container = styled.div`
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-columns: 250px auto;
  width: 100%;
  height: 100vh;
  transition: opacity 0.1s ease-in;
  opacity: ${props => (props.show ? 1 : 0)};
`;

const Content = styled.div`
  padding: 10px;
  grid-area: content;
`;

const Header = styled.div`
  padding-left: 10px;
  font-size: 24px;
  color: gray;
`;

const NewPostButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PostList = styled.div`
  margin-top: 10px;
`;

export function HomePage() {
  const history = useHistory();
  const allPosts = useQuery(LIST_POSTS_QUERY);

  return (
    <Container data-testid="HomePage" show={!allPosts.loading}>
      <Sidebar />
      <Content data-testid="Content">
        <NewPostButton>
          <Button
            onClick={() => {
              history.push("/new");
            }}
          >
            New Post
          </Button>
        </NewPostButton>
        <Header>Home</Header>
        <PostList data-testid="PostList">
          {!allPosts.loading &&
            allPosts.data.listPosts.items.map(p => (
              <PostItem key={p.id} post={p} />
            ))}
        </PostList>
      </Content>
    </Container>
  );
}

const LIST_POSTS_QUERY = `query listPosts {
  listPosts {
    items {
      id
      type 
      title
      createdAt
      owner
      messages {
        items {
          content
        }
      }
    }
  }
}`;
