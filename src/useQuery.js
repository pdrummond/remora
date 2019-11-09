import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import useDeepCompareEffect from "use-deep-compare-effect";

export const useQuery = (query, variables = {}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState({});

  const fetchQuery = async (query, variables) => {
    try {
      const { data } = await API.graphql(graphqlOperation(query, variables));
      if (variables.onCompleteQuery) {
        variables.onCompleteQuery();
      }
      setData(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = (vars = variables) => {
    fetchQuery(query, vars);
  };

  useDeepCompareEffect(() => {
    fetchQuery(query, variables);
  }, [query, variables]);

  return {
    loading,
    data,
    error,
    refetch
  };
};
