import React from 'react';
import Text from '../../ui/text';
import { ChartOpts, Data } from '../../common/types';
import { Chart, registerables, ChartConfiguration, defaults } from 'chart.js';
import { axisHoverPlugin } from 'axis-hover-plugin';

interface ChartProps {
  data?: Data;
  chartOpts?: ChartOpts;
}

interface ChartState {
  chart?: Chart<'bar', { x: string; y: number }[]>;
}

class ChartComponent extends React.Component<ChartProps, ChartState> {
  constructor(props: ChartProps) {
    super(props);
    this.state = {};
    Chart.register(...registerables);
  }

  componentDidUpdate(prevProps: ChartProps): void {
    const { chart } = this.state;
    const { data, chartOpts } = this.props;
    if (!data || !chart) {
      this.createNewChart();
      return;
    }
    if (prevProps.data !== data) {
      chart.data = data;
      this.createNewChart();
      // chart.update();
    }
    if (prevProps.chartOpts !== chartOpts && chartOpts) {
      this.updateChart(chart, chartOpts, data);
    }
    console.log(Chart.defaults.font)
  }

  createConfig = (
    data: Data,
    chartOpts: ChartOpts
  ): ChartConfiguration<'bar', { x: string; y: number }[]> => ({
    data: data,
    type: 'bar',
    options: this.createChartOptions(data, chartOpts),
    plugins: [
      axisHoverPlugin(
        true,
        data.datasets[0].data.map(dp => dp.x)
      )
    ],
  });

  createChartOptions = (
    data: Data,
    chartOpts: ChartOpts
  ): ChartConfiguration<'bar', { x: string; y: number }[]>['options'] => ({
    datasets: {
      bar: {
        backgroundColor: (context) => {
          return chartOpts.colorFunction(context, data, chartOpts.colorOpts);
        },
        borderRadius: chartOpts.borderRadius,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    animation:  chartOpts.animations && defaults.animations,
    plugins: {
      axis_hover_plugin: {
        font: `800 12px 'Nunito', sans-serif`
      },
      legend: {
        display: false,
      },
    },
  });

  createNewChart = () => {
    this.state.chart?.destroy();
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    const { data, chartOpts } = this.props;
    if (data && canvas !== null && chartOpts) {
      const chart = new Chart(canvas, this.createConfig(data, chartOpts));
      this.setState({ chart: chart });
    }
  };

  updateChart = (
    chart: Chart<'bar', { x: string; y: number }[]>,
    chartOpts: ChartOpts,
    data: Data
  ) => {
    const newOptions = this.createChartOptions(data, chartOpts);
    if (newOptions) {
      chart.options = newOptions;
      chart.update();
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
