import React from "react";
import { Auth } from "aws-amplify";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = React.useState("...");
  React.useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user);
    };
    getCurrentUser();
  }, []);

  return {
    currentUser
  };
}
