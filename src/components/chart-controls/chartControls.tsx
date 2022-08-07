import React from 'react';
import Text from '../../ui/text';
import Button from '../../ui/button';
import Input from '../../ui/slider';
import { defaultOpts, exampleLabels } from './fixtures';
import { Data, ChartOpts, ColorOpts } from '../../common/types';
import Slider from '../../ui/slider/slider';
import styles from './style.css';

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
  chartOpts: ChartOpts;
  nDatapoints: number;
}

class ChartControls extends React.Component<
  ChartControlsProps,
  ChartControlsState
> {
  constructor(props: ChartControlsProps) {
    super(props);
    const nDatapoints = 10;
    this.state = {
      nDatapoints,
      data: this.getRandomData(),
      chartOpts: defaultOpts,
    };
    this.props.onDataChange(this.state.data);
    this.props.onOptsChange(defaultOpts);
  }

  updateOpts = (opt: Partial<ChartOpts>) => {
    const chartOpts = { ...this.state.chartOpts, ...opt };
    this.setState({ chartOpts });
    this.props.onOptsChange(this.state.chartOpts);
  };

  updateColorOpts = (colorOpt: Partial<ColorOpts>) => {
    const colorOpts = { ...this.state.chartOpts.colorOpts, ...colorOpt };
    this.updateOpts({ colorOpts });
  };

  updateData = (data: Data) => {
    this.setState({ data });
    this.props.onDataChange(this.state.data);
  };

  handleChangeDps = (nDatapoints: number) => {
    this.setState({ nDatapoints });
    this.updateData(this.getRandomData());
  };

  bubbleSortData = async (data: Data): void => {
    const dataArray = data.datasets[0].data
    let sorted = false;
    while (!sorted){
        sorted = true
            await dataArray.forEach(async (dp, i) => {
                if (i !== dataArray.length - 1 && dataArray[i+1].y < dataArray[i].y){
                    let tmp = dataArray[i]
                    dataArray[i] = dataArray[i+1]
                    dataArray[i+1] = tmp
                    const updatedData = {
                        datasets: [
                            {
                                data: dataArray
                            }
                        ]
                    }
                    this.updateData(updatedData)
                    console.log(updatedData)
                    await setTimeout(() => null, 1000)
                    sorted=false;
                }
            })
        }
  }

  getRandomData = () => {
    const endSlice = this.state?.nDatapoints || 10;
    const labels = getShuffledArr(exampleLabels.slice(0, endSlice));
    return {
      datasets: [
        {
          data: labels.map((label) => ({
            x: label,
            y: Math.floor(Math.random() * 1000),
          })),
        },
      ],
    };
  };

  renderDataControls() {
    return (
      <div className={styles['data-controls']}>
        <Text size="lg"> Data Controls </Text>
        <Button onClick={() => this.updateData(this.getRandomData())}>
          Randomise data
        </Button>
        <Button onClick={() => this.bubbleSortData(this.state.data)}>
          Bubble sort
        </Button>
        <Slider
          onChange={(value) => this.handleChangeDps(value)}
          min="1"
          max={exampleLabels.length}
          startingVal="10"
          label="Add/Remove Datapoints"
          debounceTime={500}
        ></Slider>
      </div>
    );
  }

  renderDisplayControls() {
    return (
      <div className={styles['display-controls']}>
        <Text size="lg">Display Controls</Text>
        <Slider
          onChange={(value) => this.updateOpts({ borderRadius: value })}
          min="0"
          max="30"
          startingVal="4"
          label="Bar Border Radius"
        ></Slider>
        <Slider
          onChange={(value) => this.updateColorOpts({ baseHue: value })}
          min="0"
          max="255"
          startingVal="206"
          label="Starting hue"
        ></Slider>
        <Slider
          onChange={(value) => this.updateColorOpts({ hueSpan: value })}
          min="0"
          max="100"
          startingVal="30"
          label="Hue Span"
        ></Slider>
      </div>
    );
  }
  render() {
    return (
      <div className={styles['controls-container']}>
        {this.renderDataControls()}
        {this.renderDisplayControls()}
      </div>
    );
  }
}

export default ChartControls;
