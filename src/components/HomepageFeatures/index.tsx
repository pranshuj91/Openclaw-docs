import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Clear, structured guides',
    Svg: require('@site/static/img/openclaw-guides.svg').default,
    description: (
      <>
        Learn OpenClaw step by step with opinionated tutorials, concepts, and
        recipes—from first setup to advanced production workflows.
      </>
    ),
  },
  {
    title: 'Designed for builders',
    Svg: require('@site/static/img/openclaw-architecture.svg').default,
    description: (
      <>
        Understand how OpenClaw fits into your stack, common architecture
        patterns, and best practices so you can ship features faster.
      </>
    ),
  },
  {
    title: 'Reference you can trust',
    Svg: require('@site/static/img/openclaw-api.svg').default,
    description: (
      <>
        Dive into detailed API references, configuration options, and examples
        that stay in sync with the latest OpenClaw releases.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
