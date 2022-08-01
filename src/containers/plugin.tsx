import React from 'react';
import Entrance from '../components/entrance';
import PluginDemo from '../components/plugin-demo';
import styles from './style.css';

type Tabs = 'entrance' | 'demo';

interface PluginState {
  tab: Tabs;
}

class Plugin extends React.Component<{}, PluginState> {
  private _pluginDemo: React.RefObject<PluginDemo>;
  constructor(props: {}) {
    super(props);
    this.state = {
      tab: 'entrance',
    };
    this._pluginDemo = React.createRef();
  }

  fadeInPluginDemo = () => {
    setTimeout(() => this._pluginDemo.current?.fadeIn(), 10);
  };

  handleEnter = () => {
    this.setState({ tab: 'demo' });
    this.fadeInPluginDemo();
  };
  render() {
    switch (this.state.tab) {
      case 'demo':
        return (
          <PluginDemo
            ref={this._pluginDemo}
            visible={this.state.tab === 'demo'}
          ></PluginDemo>
        );
      case 'entrance':
      default:
        return (
          <Entrance
            onEnter={() => this.handleEnter()}
            fadeDuration={0.3}
          ></Entrance>
        );
    }
  }
}

export default Plugin;
