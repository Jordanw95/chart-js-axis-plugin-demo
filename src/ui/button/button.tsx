import React from 'react';
import styles from './style.css';

type ButtonVariant = 'standard' | 'fancy';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: string;
}

class Button extends React.Component<ButtonProps, {}> {
  constructor(props: ButtonProps) {
    super(props);
  }
  render() {
    const { variant = 'standard', children, onClick, size="" } = this.props;
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]}`;
    return (
      <button className={buttonClass} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
