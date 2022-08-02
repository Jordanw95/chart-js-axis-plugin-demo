import React from 'react';
import Text from '../../ui/text';
import { ChartOpts, Data } from '../../common/types';
import { Chart, registerables, ChartConfiguration } from 'chart.js';

interface ChartProps {
  data?: Data;
  chartOpts?: ChartOpts;
}

interface ChartState {
    chart?: Chart<'bar', {x:string, y:number}[]>
}

class ChartComponent extends React.Component<ChartProps, ChartState> {
  constructor(props: ChartProps) {
    super(props);
    this.state = {};
    Chart.register(...registerables)
  }

  componentDidUpdate(prevProps: ChartProps): void {
      if (prevProps.data !== this.props.data){
          this.createNewChart();
      }
  }

  createConfig = (data: Data, chartOpts: ChartOpts): ChartConfiguration<'bar', {x: string, y: number}[]> => ({
      data: data, 
      type: 'bar',
      options: {
          datasets: {
              bar: {
                  backgroundColor: () => chartOpts.baseColor
              }
          }
      }
  })

  createNewChart = () => {
    this.state.chart?.destroy();
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    const {data, chartOpts} = this.props
    if (data && canvas !== null && chartOpts) {
      const chart = new Chart(canvas, this.createConfig(data, chartOpts));
      this.setState({ chart: chart })
    }
  };

  render() {
    return !this.props.data ? (
      <Text size="lg"> The chart goes here </Text>
    ) : (
      <canvas id="chart"></canvas>
    );
  }
}

export default ChartComponent;
