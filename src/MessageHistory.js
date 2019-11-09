import React from "react";
import { MessageItem } from "./MessageItem";
import styled from "styled-components";
import { parsePostQueryForMessages } from "./utils/parsePostQueryForMessages";

const Container = styled.div`
  grid-area: content;
`;

const LoadMoreDivider = styled.div`
  position: relative;
  height: 80px;
`;

const DividerLine = styled.div`
  position: relative;
  top: 28px;
  height: 1px;
  border: 1px dashed #d6dee2;
`;
const DividerText = styled.div`
  border: 1px solid lightgray;
  background-color: white;
  padding: 10px;
  z-index: 1;
  position: absolute;
  width: 200px;
  left: 0px;
  right: 0px;
  font-size: 12px;
  margin: auto;
  text-align: center;
`;

const ShowMore = styled.div`
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: #007bff;
  }
`;

export function MessageHistory({ messagesQuery, onMoreMessagesClicked }) {
  if (messagesQuery.loading || messagesQuery.error) {
    return null;
  } else {
    const {
      oldestMessages,
      newestMessages,
      isMoreMessages
    } = parsePostQueryForMessages(
      messagesQuery.data.messages.oldestMessages.items,
      messagesQuery.data.messages.newestMessages.items
    );

    const disableShowMore = oldestMessages.length + newestMessages.length < 31;

    return (
      <Container>
        {oldestMessages.map(m => (
          <MessageItem message={m} key={m.id} />
        ))}

        {disableShowMore === false && isMoreMessages && (
          <LoadMoreDivider data-testid="LoadMoreDivider">
            <DividerText>
              <div>Some messages are hidden</div>
              <ShowMore onClick={onMoreMessagesClicked}>Show more</ShowMore>
            </DividerText>
            <DividerLine></DividerLine>
          </LoadMoreDivider>
        )}

        {newestMessages.map(m => (
          <MessageItem message={m} key={m.id} />
        ))}
      </Container>
    );
  }
}
