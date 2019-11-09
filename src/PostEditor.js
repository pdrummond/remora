import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { mutation } from "./mutation";

const Container = styled.div`
  & ::placeholder {
    color: lightgray;
  }
`;

const TitleInput = styled.input`
  margin-bottom: 20px;
  font-size: 24px;
  border: none;
  background-color: #f7f9fa;
  width: 100%;
  padding: 10px;

  &:focus {
    outline: 2px solid #cfd4d6;
    background-color: white;
  }
`;
const Editor = styled.textarea`
  border: none;
  background-color: #f7f9fa;
  min-height: 30px;
  height: 50vh;
  width: 100%;
  padding: 10px;

  &:focus {
    outline: 2px solid #cfd4d6;
    background-color: white;
  }
`;

const Buttons = styled.div`
  float: right;
  margin-bottom: 10px;
`;

export function PostEditor({ post, onPostSaved, onCancelled }) {
  const [title, setTitle] = React.useState(post.title);
  const [content, setContent] = React.useState(post.content);

  const updatePost = async () => {
    await mutation(UPDATE_POST_MUTATION, {
      id: post.id,
      title,
      content
    });
    if (onPostSaved) {
      onPostSaved();
    }
  };

  return (
    <Container data-testid="PostEditor">
      <Buttons>
        <Button
          variant="link"
          onClick={() => {
            if (onCancelled) {
              onCancelled();
            }
          }}
        >
          Cancel
        </Button>
        <Button disabled={!content} onClick={updatePost}>
          Save
        </Button>
      </Buttons>
      <TitleInput
        placeholder="Enter title here..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Editor
        placeholder="Enter content here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
    </Container>
  );
}

const UPDATE_POST_MUTATION = `mutation updatePost($id:ID!, $title:String!, $content:String!) {
    updatePost(input: {id:$id, title:$title, content:$content}) {
      id
      title
      content
      type
      createdAt
      owner
      participants
    }
  }`;
