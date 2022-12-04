import React from 'react';
import Button from '../../ui/button';
import Text from '../../ui/text';
import styles from './style.css';

interface EntranceProps {
  onEnter: () => void;
  fadeDuration: number;
}

interface EntranceState {
  fade: boolean;
}

class Entrance extends React.Component<EntranceProps, EntranceState> {
  constructor(props: EntranceProps) {
    super(props);
    this.state = {
      fade: false,
    };
  }

  handleEnter = () => {
    this.setState({ fade: true });
    setTimeout(() => this.props.onEnter(), this.props.fadeDuration * 1000);
  };

  openNpm = () => {
    window
      .open('https://www.npmjs.com/package/axis-hover-plugin', '_blank')
      ?.focus();
  };

  render() {
    const bodyClass = `${styles['entrance-body']} ${
      this.state.fade && styles.fade
    }`;
    const style = {
      '--fade-out-duration': `${this.props.fadeDuration}s`,
    } as React.CSSProperties;
    return (
      <div className={bodyClass} style={style}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles['icon-container']}>
              <svg
                className={styles['chart-icon']}
                width="80px"
                height="80px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12,6a1,1,0,0,0-1,1V17a1,1,0,0,0,2,0V7A1,1,0,0,0,12,6ZM7,12a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V13A1,1,0,0,0,7,12Zm10-2a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V11A1,1,0,0,0,17,10Zm2-8H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2Zm1,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z" />
              </svg>
            </div>
            <Text size="lg">Axis hover plugin</Text>
          </div>
          <div className={styles.splitter}></div>
          <div className={styles['button-container']}>
            <Button onClick={() => this.handleEnter()} variant="fancy">
              View demo...
            </Button>
            <Button onClick={() => this.openNpm()} variant="fancy" size="md">
              View npm package
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Entrance;
