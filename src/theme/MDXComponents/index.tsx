import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

type Props = {
  readonly children?: React.ReactNode;
};

function Note(props: Props) {
  return (
    <Admonition type="note" {...props}>
      {props.children}
    </Admonition>
  );
}

function Tip(props: Props) {
  return (
    <Admonition type='tip' {...props}>
      {props.children}
    </Admonition>
  );
}

function SimpleContainer(props: Props) {
  return <div>{props.children}</div>;
}

export default {
  // Keep Docusaurus default MDX components
  ...MDXComponents,

  // Tabs support (use <Tabs> and <Tab> like in the docs)
  Tabs,
  Tab: TabItem,

  // Admonition-style components used in the imported docs
  Note,
  Tip,

  // Simple layout wrappers so pages don't crash even if we don't fully style them yet
  AccordionGroup: SimpleContainer,
  Accordion: SimpleContainer,
  CardGroup: SimpleContainer,
  Card: SimpleContainer,
  Steps: SimpleContainer,
  Step: SimpleContainer,
};

