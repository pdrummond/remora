import React from "react";

const AppContext = React.createContext({});

export function AppProvider(props) {
  const [state, dispatch] = React.useReducer(appReducer, { currentUser: null });
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <AppContext.Provider value={value} {...props} />;
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error(`useAppContext must be used within a AppProvider`);
  }
  const [state, dispatch] = context;

  const setCurrentUser = React.useCallback(
    currentUser => {
      dispatch({ type: "SET_CURRENT_USER", payload: { currentUser } });
    },
    [dispatch]
  );

  return {
    appState: state,
    setCurrentUser
  };
}

export function appReducer(state, action) {
  let newState = state;
  console.log("ACTION:", action);
  switch (action.type) {
    case "SET_CURRENT_USER":
      newState = {
        ...state,
        currentUser: action.payload.currentUser
      };
      break;
    default:
      break;
  }
  console.log("NEW STATE:", newState);
  return newState;
}
