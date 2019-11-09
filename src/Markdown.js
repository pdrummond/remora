import React from "react";
import ReactMarkdown from "react-markdown";

export function Markdown({ content }) {
  return <ReactMarkdown source={content} className="MarkdownContent" />;
}
