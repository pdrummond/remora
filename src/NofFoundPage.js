import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 50px;
`;

export const NotFoundPage = () => (
  <Container>
    <Link to="/">404 | Ooops!</Link>
  </Container>
);
