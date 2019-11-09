import { API, graphqlOperation } from "aws-amplify";

export const mutation = async (query, variables) => {
  try {
    return await API.graphql(graphqlOperation(query, variables));
  } catch (error) {
    console.error(error);
  }
};
