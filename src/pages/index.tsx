import * as React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import logo from "/img/logo.png";
import squidplug from "/img/squidplug.png";
import styles from "./index.module.css";
import { useColorMode } from "@docusaurus/theme-common";

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
          An open-source standards and software project for controlling intimate
          hardware, including sex toys, fucking machines, and more.
        </p>
        <p
          style={{ fontSize: "1.1rem", fontStyle: "italic", marginTop: "1rem" }}
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
            to="/docs/dev-guide"
          >
            Developer Guide
          </Link>
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
        "Implemented in Rust, with bindings for C#, JS, and other languages.",
    },
    {
      title: "🎮 Wide Hardware Support",
      description:
        "Support for over 750 different pieces of hardware, from popular brands like Lovense, Kiiroo, The Handy, WeVibe, OSR-2/SR-6, and more.",
    },
    {
      title: "🔌 Multiple Protocols",
      description:
        "Support for Bluetooth, USB, HID, Serial, and Network controlled devices.",
    },
    {
      title: "🌐 Cross-Platform",
      description:
        "Libraries available for Desktop, Mobile, and Web platforms.",
    },
    {
      title: "🎯 Game Engine Plugins",
      description: "Plugins for Unreal, Unity, Godot, Twine, and more!",
    },
    {
      title: "📖 Open Source",
      description: "Open Source with Permissive License (BSD 3-Clause).",
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
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const news = [
    { date: "2024/04/20", title: "Intiface Central v2.5.7 Released" },
    { date: "2023/11/17", title: "Intiface Central v2.4.5 Released" },
    { date: "2022/08/29", title: "Buttplug Rust v6 Released" },
    {
      date: "2021/01/19",
      title: "Buttplug Rust v2, C# v1.0.9, JS v1.0.3 Released",
    },
    { date: "2020/12/28", title: "Buttplug Rust, C#, JS v1 Released" },
  ];

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
          <ul style={{ listStyle: "none", padding: 0 }}>
            {news.map((item, idx) => (
              <li
                key={idx}
                style={{ marginBottom: "1rem", fontSize: "1.1rem" }}
              >
                <strong>{item.date}</strong> - {item.title}
              </li>
            ))}
          </ul>
        </div>
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
                  <Link to="/docs/dev-guide">Developer Guide</Link>
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
      title={`Buttplug.io Documentation Site`}
      description="Documentation for the Buttplug.io Intimate Hardware Protocol and Library"
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
