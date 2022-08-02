import React from 'react';
import Text from '../../ui/text';
import Button from '../../ui/button';
import { defaultOpts, exampleData, exampleLabels } from './fixtures';
import { Data, ChartOpts } from '../../common/types';

const getShuffledArr = (arr: string[]): string[] => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

interface ChartControlsProps {
  onDataChange: (data: Data) => void;
  onOptsChange: (opts: ChartOpts) => void;
}

interface ChartControlsState {
  data: Data;
  chartOpts: ChartOpts
}

class ChartControls extends React.Component<
  ChartControlsProps,
  ChartControlsState
> {
  constructor(props: ChartControlsProps) {
    super(props);
    this.state = { data: exampleData, chartOpts: defaultOpts };
    this.props.onDataChange(this.state.data);
    this.props.onOptsChange(defaultOpts)
  }

  updateData = (data: Data) => {
    this.setState({data})
    this.props.onDataChange(this.state.data);
  };

  getRandomData = () => {
    const labels = getShuffledArr(exampleLabels);
    const data = {
      datasets: [
        {
          data: labels.map((label) => ({
            x: label,
            y: Math.floor(Math.random() * 100),
          })),
        },
      ],
    };
    this.updateData(data)
  };

  render() {
    return (
      <div>
        <Text size="lg"> The controls </Text>
        <Button onClick={() => this.getRandomData()}>Randomise data</Button>
      </div>
    );
  }
}

export default ChartControls;
