import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;

  &:hover {
    background-color: #f7f9fa;
  }
`;
const Title = styled.div`
  a {
    color: black;
    font-weight: bold;
  }

  a:hover {
    color: #007bff;
  }
`;
const Detail = styled.div`
  font-size: 12px;
  color: gray;
`;

export function PostItem({ post }) {
  return (
    <Container data-testid="PostItem">
      <Title>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </Title>
      <Detail>
        <b>{post.type}</b> | Opened {new Date(post.createdAt).toLocaleString()}{" "}
        by {post.owner}
      </Detail>
    </Container>
  );
}
