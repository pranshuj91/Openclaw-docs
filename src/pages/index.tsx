import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <Heading as="h1" className="hero__title">
              OpenClaw Documentation
            </Heading>
            <p className="hero__subtitle">
              Everything you need to understand, integrate, and extend OpenClaw
              in one place.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Start with the OpenClaw Tutorial ⏱️
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/img/Attached_image.png"
              alt="OpenClaw pipelines and integrations overview"
              className={styles.heroIllustration}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="OpenClaw Documentation"
      description="OpenClaw technical documentation, setup guides, and production best practices">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
