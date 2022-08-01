import React from 'react';
import Text from '../../ui/text';

interface ChartProps {}

interface ChartState {}

class Chart extends React.Component<ChartProps, ChartState> {
  constructor(props: ChartProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <Text size="lg"> The chart goes here </Text>;
  }
}

export default Chart;
