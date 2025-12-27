import React, { type ReactNode, useState } from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { groupBlogSidebarItemsByYear } from "@docusaurus/plugin-content-blog/client";
import Heading from "@theme/Heading";
import type { Props } from "@theme/BlogSidebar/Content";

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
    <div role="group" style={{ marginBottom: "1rem" }}>
      <Heading
        as="h3"
        className={yearGroupHeadingClassName}
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          cursor: "pointer",
          userSelect: "none",
          position: "relative",
          paddingLeft: "1.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            transition: "transform 0.2s ease",
            transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
            fontSize: "0.8em",
          }}
        >
          ▼
        </span>
        {year}
      </Heading>
      <div style={{ display: isCollapsed ? "none" : "block" }}>{children}</div>
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
