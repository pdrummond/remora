import React from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "./useCurrentUser";

const Container = styled.div`
  grid-area: sidebar;
  display: grid;
  grid-template-areas: "list" "footer";
  grid-template-rows: auto 60px;
  background-color: #f7f9fa;
  padding: 0px;
  margin: 0px;
  height: 100vh;
  border-right: 1px solid #e6ecef;
`;

const UserFooter = styled.div`
  font-size: 24px;
  background-color: #ecf0f2;
  color: #586870;
  padding: 10px;
  cursor: pointer;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.div`
  padding: 10px;

  .active {
    font-weight: bold;
  }
`;

export function Sidebar() {
  const { currentUser } = useCurrentUser();

  const signOut = async () => {
    await Auth.signOut();
  };

  return (
    <Container data-testid="Sidebar">
      <List>
        <ListItem data-testid="HomeNavLink">
          <NavLink to="/home">Home</NavLink>
        </ListItem>
      </List>
      <UserFooter data-testid="UserFooter" onClick={signOut}>
        {currentUser.username}
      </UserFooter>
    </Container>
  );
}
