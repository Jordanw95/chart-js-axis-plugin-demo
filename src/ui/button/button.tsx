import React from 'react';
import styles from './style.css';

type ButtonVariant = 'standard' | 'fancy';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
}

class Button extends React.Component<ButtonProps, {}> {
  constructor(props: ButtonProps) {
    super(props);
    console.log(styles);
  }
  render() {
    const { variant = 'standard', children, onClick } = this.props;
    const buttonClass = `${styles.button} ${styles[variant]}`;
    return (
      <button className={buttonClass} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
