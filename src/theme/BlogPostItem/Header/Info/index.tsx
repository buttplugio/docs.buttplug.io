import React from "react";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import styles from "./styles.module.css";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostItemHeaderInfo(): React.JSX.Element {
  const { metadata } = useBlogPost();
  const { date, readingTime } = metadata;

  return (
    <div className={styles.info}>
      <time dateTime={date} className={styles.date}>
        {formatDate(date)}
      </time>
      {readingTime != null && (
        <>
          <span className={styles.separator}>&middot;</span>
          <span className={styles.readingTime}>
            {Math.ceil(readingTime)} min read
          </span>
        </>
      )}
    </div>
  );
}
