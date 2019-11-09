/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
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
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
