import React from "react";
import styled from "styled-components";
import { Markdown } from "./Markdown";

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

export function MessageItem({ message }) {
  return (
    <Message key={message.id}>
      <MessageOwner>{message.owner}</MessageOwner>
      <MessageTimestamp>
        {new Date(message.createdAt).toLocaleString()}
      </MessageTimestamp>
      <MessageContent>
        <Markdown content={message.content} />
      </MessageContent>
    </Message>
  );
}
