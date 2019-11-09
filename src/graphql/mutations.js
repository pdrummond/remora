/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    type
    title
    content
    messages {
      items {
        id
        type
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
    participants
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    type
    title
    content
    messages {
      items {
        id
        type
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
    participants
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    type
    title
    content
    messages {
      items {
        id
        type
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
    createdAt
    updatedAt
    owner
    participants
  }
}
`;
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
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
  }
}
`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
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
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
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
  }
}
`;
