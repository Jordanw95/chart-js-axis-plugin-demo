import React from 'react';
import Text from '../../ui/text';

interface ChartControlsProps {}

interface ChartControlsState {}

class ChartControls extends React.Component<
  ChartControlsProps,
  ChartControlsState
> {
  constructor(props: ChartControlsProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <Text size="lg"> The controls </Text>;
  }
}

export default ChartControls;
