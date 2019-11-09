/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = `subscription OnCreatePost($owner: String!) {
  onCreatePost(owner: $owner) {
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
export const onUpdatePost = `subscription OnUpdatePost($owner: String!, $participants: String!) {
  onUpdatePost(owner: $owner, participants: $participants) {
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
export const onDeletePost = `subscription OnDeletePost($owner: String!) {
  onDeletePost(owner: $owner) {
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
export const onCreateMessage = `subscription OnCreateMessage($owner: String!) {
  onCreateMessage(owner: $owner) {
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
export const onUpdateMessage = `subscription OnUpdateMessage($owner: String!) {
  onUpdateMessage(owner: $owner) {
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
export const onDeleteMessage = `subscription OnDeleteMessage($owner: String!) {
  onDeleteMessage(owner: $owner) {
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
