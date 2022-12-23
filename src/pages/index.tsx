import * as React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './index.module.css';
import { HeroImage } from '@site/src/components/homepage/hero';
import { FeaturesGrid } from '@site/src/components/homepage/features';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="bg-blue-500">
      <div className="container mx-auto text-center py-24">
        <h1 className="text-4xl font-bold text-white">{siteConfig.title}</h1>
        <p className="text-xl py-6 text-white">{siteConfig.tagline}</p>

        <div className="py-10">
          <Link
            className="bg-white rounded-md text-gray-500 px-4 py-2"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

const Header = (): JSX.Element => {
  const { colorMode, setColorMode } = useColorMode();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  //setColorScheme(colorMode === 'dark' ? 'light' : 'dark');
  console.log(colorMode);
  /*
            fontFamily: '"RNSSanz-Normal", Helvetica, sans-serif',
            primaryColor: 'dark',
          black: '#3a3c3c',
          colors: {
            dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2a2c2c', '#242526', '#1A1c1c', '#141517', '#101113'], // replace dark[5-7] only
            gray: ['#f7f9fb', '#F1F3F5', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#868E96', '#495057', '#343A40', '#212529'] // replace gray[0] only
          }
*/
  return (<MantineProvider withGlobalStyles withNormalizeCSS
        theme={{
          colorScheme: (colorMode === 'dark' ) ? 'dark' : 'light', // sync docusaurus and mantine themes
          primaryColor: 'dark',
        }}>
        <HeroImage />
        <FeaturesGrid />
      </MantineProvider>);
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <Header />
    </Layout>
  );
}
