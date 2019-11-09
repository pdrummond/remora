export function getPostErrorMessage(post) {
  const errorType = post.error.errors[0].errorType;
  switch (errorType) {
    case "Unauthorized":
      return "You are not authorized to view this post";
    default:
      return "Unexpected error";
  }
}
