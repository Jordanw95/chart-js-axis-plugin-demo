import React from 'react';
import Text from '../../ui/text';
import styles from './style.css';
import ChartControls from '../chart-controls';
import Chart from '../chart';

interface PluginDemoProps {
  visible: boolean;
}

interface PluginDemoState {
  fadeIn: boolean;
}

class PluginDemo extends React.Component<PluginDemoProps, PluginDemoState> {
  constructor(props: PluginDemoProps) {
    super(props);
    this.state = { fadeIn: false };
  }

  fadeIn = () => {
    this.setState({ fadeIn: true });
    console.log(this.state);
  };

  render() {
    const { fadeIn } = this.state;
    const mainClass = `${styles['main-container']} ${fadeIn && styles.visible}`;
    console.log(mainClass);
    return (
      <div className={mainClass}>
        <div className={styles['chart-container']}>
          <Chart></Chart>
        </div>
        <div className={styles['controls']}>
          <ChartControls></ChartControls>
        </div>
      </div>
    );
  }
}

export default PluginDemo;
