import React from 'react';
import Text from '../../ui/text';
import styles from './style.css';
import ChartControls from '../chart-controls';
import ChartComponent from '../chart';
import { Data, ChartOpts } from '../../common/types';

interface PluginDemoProps {
  visible: boolean;
}

interface PluginDemoState {
  fadeIn: boolean;
  data?: Data;
  chartOpts?: ChartOpts;
}

class PluginDemo extends React.Component<PluginDemoProps, PluginDemoState> {
  constructor(props: PluginDemoProps) {
    super(props);
    this.state = { fadeIn: false };
  }

  fadeIn = () => {
    this.setState({ fadeIn: true });
  };

  handleDataChange = (data: Data) => {
    this.setState({ data });
  };

  handleChartOptsChange = (opts: ChartOpts) => {
    this.setState({ chartOpts: opts });
  };

  render() {
    const { fadeIn } = this.state;
    const mainClass = `${styles['main-container']} ${fadeIn && styles.visible}`;
    return (
      <div className={mainClass}>
        <div className={styles['chart-container']}>
          <ChartComponent
            data={this.state.data}
            chartOpts={this.state.chartOpts}
          ></ChartComponent>
        </div>
        <div className={styles['controls']}>
          <ChartControls
            onDataChange={(data) => this.handleDataChange(data)}
            onOptsChange={(opts) => this.handleChartOptsChange(opts)}
          ></ChartControls>
        </div>
      </div>
    );
  }
}

export default PluginDemo;
