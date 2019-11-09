import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { mutation } from "./mutation";
import { useParams } from "react-router-dom";
const Container = styled.div`
  & ::placeholder {
    color: lightgray;
  }
`;
const Editor = styled.textarea`
  border: none;
  background-color: whitesmoke;
  min-height: 30px;
  height: 100px;
  width: 100%;
  padding: 10px;
`;
const AddOnEnter = styled.label`
  margin-left: 5px;
  & > input {
    margin-right: 5px;
  }
  & > span {
    font-size: 12px;
    color: gray;
  }
`;

export function MessageBox({ onMessageAdded }) {
  const { postId } = useParams();
  const [addOnEnter, setAddOnEnter] = React.useState(false);
  const [message, setMessage] = React.useState();

  const onEditorChange = e => {
    const content = e.target.value;
    setMessage(content);
  };

  const onEditorKeyUp = e => {
    if (addOnEnter && e.keyCode === 13) {
      e.preventDefault();
      addMessage();
    }
  };

  const addMessage = async () => {
    console.log("CONTENT:", message);
    console.log("postId:", postId);
    const result = await mutation(NEW_MESSAGE_MUTATION, {
      content: message,
      postId
    });
    console.log("NEW MESSAGE RESULT:", result);
    const messageId = result.data.createMessage.id;
    if (onMessageAdded) {
      onMessageAdded(messageId);
    }
    setMessage("");
  };

  return (
    <Container data-testid="MessageBox">
      <Editor
        autoFocus={true}
        placeholder="Enter comment here..."
        value={message}
        onChange={onEditorChange}
        onKeyDown={onEditorKeyUp}
      />
      <Button disabled={!message} onClick={addMessage}>
        Add Message
      </Button>
      <AddOnEnter>
        <input
          type="checkbox"
          checked={addOnEnter}
          onChange={e => setAddOnEnter(e.target.checked)}
        />
        <span>Add on ENTER</span>
      </AddOnEnter>
    </Container>
  );
}

const NEW_MESSAGE_MUTATION = `mutation createMessage($content:String!, $postId:ID!) {
    createMessage(input: {
      content:$content,
      type:"MESSAGE",
      messagePostId: $postId
    }){
      id
      type
      owner
      content
      createdAt
      post {
        id
      }
    }
  }`;
