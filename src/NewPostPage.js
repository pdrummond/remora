import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { mutation } from "./mutation";

const Container = styled.div`
  grid-area: post;
  height: 100%;
  overflow: auto;
  padding: 20px;
  width: 70%;
  margin: 10px auto;

  & ::placeholder {
    color: lightgray;
  }
`;
const BackButton = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;
const TitleInput = styled.input`
  margin-bottom: 20px;
  font-size: 24px;
  border: none;
  background-color: white;
  width: 100%;
  padding: 10px;

  &:focus {
    outline: 1px solid #cfd4d6;
    background-color: whitesmoke;
  }
`;
const Editor = styled.textarea`
  border: none;
  background-color: white;
  min-height: 30px;
  height: 60vh;
  width: 100%;
  padding: 10px;

  &:focus {
    outline: 1px solid #cfd4d6;
    background-color: whitesmoke;
  }
`;

export function NewPostPage() {
  const [content, setContent] = React.useState();
  const [title, setTitle] = React.useState();
  const history = useHistory();

  const addPost = async () => {
    const result = await mutation(NEW_POST_MUTATION, {
      type: "ISSUE",
      title,
      content
    });
    const postId = result.data.createPost.id;
    history.push(`/post/${postId}`);
  };

  return (
    <Container data-testid="NewPostPage">
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
      <TitleInput
        autoFocus={true}
        placeholder="Enter title here..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Editor
        placeholder="Enter content here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Button disabled={!content} onClick={addPost}>
        Create Post
      </Button>
    </Container>
  );
}

const NEW_POST_MUTATION = `mutation createPost($title:String!, $content:String!, $type:String!) {
    createPost(input: {
      title:$title,
      content:$content,
      type:$type
    }){
      id
      title
      content
      type
      createdAt
      owner
      participants
    }
  }`;
