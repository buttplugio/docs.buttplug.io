import * as React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styled from 'styled-components';
import logo from '/img/logo.png';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src={logo} style={{maxWidth: 400}} />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--md"
            to="/docs/"
          >
            Buttplug Developer Guide
          </Link>
          <Link
            className="button button--secondary button--md"
            to="/docs/spec"
          >
            Buttplug Protocol Specification
          </Link>
          <Link
            className="button button--secondary button--md"
            to="/docs/stpihkal"
          >
            Sex Toy Protocols I Have Known And Loved
          </Link>

        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Buttplug.io Documentation Site`}
      description="Documentation for the Buttplug.io Intimate Hardware Protocol and Library">
      <HomepageHeader />
    </Layout>
  );
}
