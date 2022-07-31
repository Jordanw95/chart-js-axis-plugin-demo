import React from 'react';
import styles from './style.css';

type TextVariant = 'standard';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface TextProps extends React.ComponentPropsWithoutRef<'p'> {
  size?: TextSize;
  variant?: TextVariant;
}

const textSizeMap: Record<TextSize, string> = {
  xs: '8px',
  sm: '11px',
  md: '14px',
  lg: '20px',
  xl: '32px',
  xxl: '46px',
};

class Text extends React.Component<TextProps, {}> {
  constructor(props: TextProps) {
    super(props);
  }

  render() {
    const { variant = 'standard', size = 'md', children } = this.props;
    const textClass = `${styles.text} ${styles[variant]}`;
    const style = { '--font-size': textSizeMap[size] } as React.CSSProperties;
    return (
      <p className={textClass} style={style}>
        {children}
      </p>
    );
  }
}

export default Text;
