import React from 'react';
import Entrance from '../components/entrance';
import styles from './style.css';

type Tabs = 'entrance' | 'demo';

interface PluginState {
  tab: Tabs;
}

class Plugin extends React.Component<{}, PluginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tab: 'entrance',
    };
  }
  handleEnter = () => {
    this.setState({ tab: 'demo' });
  };
  render() {
    return (
      <Entrance
        onEnter={() => this.handleEnter()}
        fade={this.state.tab !== 'entrance'}
      ></Entrance>
    );
  }
}

export default Plugin;
