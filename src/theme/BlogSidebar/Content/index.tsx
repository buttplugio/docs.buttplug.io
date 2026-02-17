import React, { type ReactNode, useState } from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { groupBlogSidebarItemsByYear } from "@docusaurus/plugin-content-blog/client";
import Heading from "@theme/Heading";
import type { Props } from "@theme/BlogSidebar/Content";
import styles from "./styles.module.css";

function BlogSidebarYearGroup({
  year,
  yearGroupHeadingClassName,
  children,
}: {
  year: string;
  yearGroupHeadingClassName?: string;
  children: ReactNode;
}) {
  const currentYear = new Date().getFullYear().toString();
  const [isCollapsed, setIsCollapsed] = useState(year !== currentYear);

  return (
    <div role="group" className={styles.yearGroup}>
      <Heading
        as="h3"
        className={`${yearGroupHeadingClassName ?? ""} ${styles.yearHeading}`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span
          className={`${styles.collapseIndicator} ${isCollapsed ? styles.collapseIndicatorCollapsed : ""}`}
        >
          ▼
        </span>
        {year}
      </Heading>
      <div
        className={
          isCollapsed ? styles.yearContentCollapsed : styles.yearContent
        }
      >
        {children}
      </div>
    </div>
  );
}

function BlogSidebarContent({
  items,
  yearGroupHeadingClassName,
  ListComponent,
}: Props): ReactNode {
  const themeConfig = useThemeConfig();
  if (themeConfig.blog.sidebar.groupByYear) {
    const itemsByYear = groupBlogSidebarItemsByYear(items);
    return (
      <>
        {itemsByYear.map(([year, yearItems]) => (
          <BlogSidebarYearGroup
            key={year}
            year={year}
            yearGroupHeadingClassName={yearGroupHeadingClassName}
          >
            <ListComponent items={yearItems} />
          </BlogSidebarYearGroup>
        ))}
      </>
    );
  } else {
    return <ListComponent items={items} />;
  }
}

export default BlogSidebarContent;
