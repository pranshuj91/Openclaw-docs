import React, {useState, useMemo} from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

type Props = {
  readonly children?: React.ReactNode;
  readonly title?: string;
  readonly value?: string;
  readonly label?: string;
  readonly icon?: string;
  readonly href?: string;
  readonly headline?: string;
  readonly tip?: string;
  readonly defaultOpen?: boolean;
  [key: string]: any;
};

// Create a Tab component that renders as TabItem
// We need to intercept props and transform title -> value/label
const Tab = React.memo((props: Props) => {
  const { title, value, label, ...rest } = props;
  
  // Generate a stable value from title if not provided
  const tabValue = useMemo(() => {
    if (value) return value;
    if (title) {
      // Create a consistent slug from title
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
      return slug || 'tab';
    }
    return 'tab';
  }, [value, title]);
  
  // Use title as label if label not provided
  const tabLabel = label || title || tabValue;
  
  // Return TabItem directly - this is what Docusaurus expects
  return <TabItem value={tabValue} label={tabLabel} {...rest} />;
});

Tab.displayName = 'Tab';

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

function Info(props: Props) {
  return (
    <Admonition type='info' {...props}>
      {props.children}
    </Admonition>
  );
}

function Check(props: Props) {
  return (
    <Admonition type='success' {...props}>
      {props.children}
    </Admonition>
  );
}

function Warning(props: Props) {
  return (
    <Admonition type='warning' {...props}>
      {props.children}
    </Admonition>
  );
}

function Danger(props: Props) {
  return (
    <Admonition type='danger' {...props}>
      {props.children}
    </Admonition>
  );
}

function SimpleContainer(props: Props) {
  return <div className="mb-4">{props.children}</div>;
}

function Columns(props: Props) {
  return <div className="row" style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>{props.children}</div>;
}

function Card(props: Props) {
  const { title, href, icon, children } = props;
  const content = (
    <div style={{
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '8px',
      padding: '1rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {title && <h3 style={{marginTop: 0}}>{title}</h3>}
      <div style={{flex: 1}}>{children}</div>
    </div>
  );
  
  if (href) {
    return <a href={href} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>{content}</a>;
  }
  return content;
}

function CardGroup(props: Props) {
  const { cols = 3 } = props;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: '1rem',
      marginBottom: '1rem'
    }}>
      {props.children}
    </div>
  );
}

function Steps(props: Props) {
  return <div className="steps">{props.children}</div>;
}

function Step(props: Props) {
  const { title, children } = props;
  return (
    <div className="step">
      {title && <h4>{title}</h4>}
      {children}
    </div>
  );
}

function AccordionGroup(props: Props) {
  return <div>{props.children}</div>;
}

function Accordion(props: Props) {
  const { title, defaultOpen, children } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  
  return (
    <details open={isOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)} style={{marginBottom: '1rem'}}>
      <summary style={{cursor: 'pointer', fontWeight: 'bold', padding: '0.5rem'}}>{title}</summary>
      <div style={{padding: '1rem'}}>{children}</div>
    </details>
  );
}

function Tooltip(props: Props) {
  const { headline, tip, children } = props;
  return (
    <span title={tip || headline} style={{textDecoration: 'underline', textDecorationStyle: 'dotted', cursor: 'help'}}>
      {children}
    </span>
  );
}

export default {
  // Keep Docusaurus default MDX components
  ...MDXComponents,

  // Tabs support - explicitly export TabItem so it's always available
  Tabs,
  TabItem,
  // Map Tab to a function that returns TabItem with transformed props
  Tab: (props: Props) => {
    const { title, value, label, ...rest } = props;
    
    // Generate value from title if not provided
    const tabValue = value || (title ? title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'tab' : 'tab');
    
    const tabLabel = label || title || tabValue;
    
    // Return TabItem directly - this is what Docusaurus expects
    return React.createElement(TabItem, { value: tabValue, label: tabLabel, ...rest });
  },

  // Admonition-style components
  Note,
  Tip,
  Info,
  Check,
  Warning,
  Danger,

  // Layout components
  Columns,
  Card,
  CardGroup,
  Steps,
  Step,
  AccordionGroup,
  Accordion,
  Tooltip,
};

