/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessageInPost = `subscription OnCreateMessageInPost($messagePostId: ID!) {
  onCreateMessageInPost(messagePostId: $messagePostId) {
    id
    type
    content
    post {
      id
      type
      title
      content
      messages {
        nextToken
      }
      createdAt
      updatedAt
      owner
      participants
    }
    createdAt
    updatedAt
    owner
    messagePostId
  }
}
`;
