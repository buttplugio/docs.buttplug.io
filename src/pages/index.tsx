import * as React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import logo from "/img/logo.png";
import styles from "./index.module.css";
import { useColorMode } from "@docusaurus/theme-common";
import ReactMarkdown from "react-markdown";
import useGlobalData from "@docusaurus/useGlobalData";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <img src={logo} className={styles.heroLogo} alt="Buttplug Logo" />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p
          className="hero__subtitle"
          style={{ fontSize: "1.3rem", marginTop: "1rem" }}
        >
          An open-source software library and application ecosystem for
          controlling intimate hardware, including sex toys, fucking machines,
          and more.
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            fontStyle: "italic",
            marginTop: "1rem",
          }}
        >
          We were vibe coding before it was cool.
        </p>
        <div className={styles.buttons} style={{ marginTop: "2rem" }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/dev-guide/getting-started"
          >
            Quickstart Guide
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/dev-guide/"
          >
            Developer Guide
          </Link>
        </div>
        <div
          style={{
            marginTop: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            padding: "1rem",
            borderRadius: "8px",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <p style={{ margin: 0, fontSize: "1.1rem" }}>
            Not a developer? Looking for Intiface Central or other applications?{" "}
            <Link
              to="https://intiface.com"
              style={{
                color: "inherit",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              Head over to the Intiface page.
            </Link>
          </p>
        </div>
      </div>
    </header>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "🦀 Built with Rust",
      description:
        "Implemented in [Rust](https://github.com/buttplugio/buttplug), with bindings for [C#](https://github.com/buttplugio/buttplug-csharp), [JS/TS](https://github.com/buttplugio/buttplug-js), and other languages.",
    },
    {
      title: "🎮 Wide Hardware Support",
      description:
        "Support for over 750 different pieces of hardware, from popular brands like [Lovense](https://lovense.buttplug.io), [Kiiroo](https://kiiroo.buttplug.io), [The Handy](https://thehandy.buttplug.io), WeVibe, Satisfyer, OSR-2/SR-6, and more.",
    },
    {
      title: "🔌 Multiple Protocols",
      description:
        "Support for Bluetooth, USB, HID, Serial, and Network controlled devices.",
    },
    {
      title: "❓ Many Support Options",
      description:
        "Have a problem? Check with us on [our forums](https://discuss.buttplug.io), [Discord](https://discord.buttplug.io), or [Subreddit](https://www.reddit.com/r/buttplugio/)!",
    },
    {
      title: "🎯 Game Engine Plugins",
      description:
        "Plugins for building games and apps in [Unity](https://github.com/buttplugio/buttplug-unity), Godot, Unreal, [Twine](https://github.com/buttplugio/buttplug-twine), and more!",
    },
    {
      title: "📖 Cross-Platform & Open Source",
      description:
        "Libraries available for Desktop/Mobile/Web. Open Source with Permissive License (BSD 3-Clause).",
    },
  ];

  const { isDarkTheme } = useColorMode();
  let color = isDarkTheme ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)";
  return (
    <section
      className={styles.features}
      style={{
        backgroundImage: "url(/img/squidplug.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundColor: color,
        backgroundBlendMode: "overlay",
        position: "relative",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            fontSize: "2.5rem",
          }}
        >
          Features
        </h2>
        <div className="row">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="col col--4"
              style={{ marginBottom: "2rem" }}
            >
              <div
                className="text--center"
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(128,128,128,0.4)",
                  borderRadius: "10px",
                }}
              >
                <h3>{feature.title}</h3>
                <ReactMarkdown>{feature.description}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const globalData = useGlobalData();
  const blogPluginData =
    globalData?.["docusaurus-plugin-content-blog"]?.["blog"]["default"];
  const recentPosts = blogPluginData?.recentPosts?.slice(0, 5) || [];

  return (
    <section
      className={styles.newsSection}
      style={{
        backgroundColor: "var(--ifm-color-emphasis-100)",
        padding: "3rem 0",
      }}
    >
      <div className="container">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "2.5rem",
          }}
        >
          Latest News
        </h2>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {recentPosts && recentPosts.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {recentPosts.map((post, idx) => (
                <li
                  key={idx}
                  style={{ marginBottom: "1rem", fontSize: "1.1rem" }}
                >
                  <strong>
                    {new Date(post.metadata.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </strong>{" "}
                  -{" "}
                  <Link to={post.metadata.permalink}>
                    {post.metadata.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: "center", fontStyle: "italic" }}>
              No blog posts available yet.
            </p>
          )}
        </div>{" "}
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className={styles.resources} style={{ padding: "3rem 0" }}>
      <div className="container">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "2.5rem",
          }}
        >
          Resources
        </h2>
        <div className="row">
          <div className="col col--4">
            <div className="card" style={{ height: "100%" }}>
              <div className="card__header">
                <h3>📱 Hardware Support</h3>
              </div>
              <div className="card__body">
                <p>Want to know if your toy/hardware is supported?</p>
                <Link
                  to="https://iostindex.com"
                  className="button button--primary button--block"
                >
                  Check IOSTIndex
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className="card" style={{ height: "100%" }}>
              <div className="card__header">
                <h3>📚 Documentation</h3>
              </div>
              <div className="card__body">
                <p style={{ marginBottom: "0.5rem" }}>
                  <Link to="/docs/dev-guide/">Developer Guide</Link>
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <Link to="/docs/spec">Protocol Specification</Link>
                </p>
                <p>
                  <Link to="/docs/stpihkal">Sex Toy Protocols (STPIHKAL)</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className="card" style={{ height: "100%" }}>
              <div className="card__header">
                <h3>🎬 In the Media</h3>
              </div>
              <div className="card__body">
                <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  <Link to="https://www.rollingstone.com/culture/culture-features/teledildonics-covid-19-sex-toys-967440/">
                    Rolling Stone: Teledildonics and COVID-19
                  </Link>
                </p>
                <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  <Link to="https://www.vice.com/en/article/here-s-why-we-need-more-open-source-software-for-buttplugs/">
                    Vice Motherboard: Open Source Software For Buttplugs
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportedHardwareSection() {
  const brands = [
    "Lovense (All products)",
    "Kiiroo (All products)",
    "The Handy",
    "Joyhub",
    "Galaku",
    "We-Vibe",
    "Mysteryvibe",
    "Vorze",
    "Vibratissimo",
    "Magic Motion",
    "MotorBunny",
    "Tempest OSR-2/SR-6/SSR-1",
    "XBox Compatible Gamepads (Rumble)",
    "Nintendo Switch Joycons (Rumble)",
    "Protogens",
    "V1 (V2 and Gabriel coming soon)",
    "And more being added regularly!",
  ];

  return (
    <section
      className={styles.hardware}
      style={{
        backgroundColor: "var(--ifm-color-emphasis-100)",
        padding: "3rem 0",
      }}
    >
      <div className="container">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            fontSize: "2.5rem",
          }}
        >
          Supported Hardware Brands
        </h2>
        <p
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontStyle: "italic",
          }}
        >
          See <Link to="https://iostindex.com">iostindex.com</Link> for a
          complete list
        </p>
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
              }}
            >
              {brands.map((brand, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "0.5rem",
                    textAlign: "center",
                    backgroundColor: "var(--ifm-color-emphasis-200)",
                    borderRadius: "8px",
                  }}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.9rem",
            fontStyle: "italic",
            color: "var(--ifm-color-emphasis-700)",
          }}
        >
          Note: Due to different features and requirements in operating systems
          and programming languages, not all hardware may be supported in all
          Buttplug implementations.
        </p>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Buttplug.io Intimate Hardware Control Library`}
      description="Homepage and Documentation for the Buttplug.io Intimate Hardware Control Library"
    >
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <NewsSection />
        <ResourcesSection />
        <SupportedHardwareSection />
      </main>
    </Layout>
  );
}
