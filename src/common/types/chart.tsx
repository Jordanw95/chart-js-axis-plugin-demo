import { ScriptableContext } from 'chart.js';

export type Datapoint = {
    x: string;
    y: number;
  }

export type Data = {
  datasets: {
    data: Datapoint[];
  }[];
};

export interface ColorOpts {
  baseHue: number;
  hueSpan: number;
}

export type ColorFunction = (
  context: ScriptableContext<'bar'>,
  data: Data,
  colorOpts: ColorOpts
) => string;

export interface ChartOpts {
  colorOpts: ColorOpts;
  borderRadius: number;
  colorFunction: ColorFunction;
  animations: boolean;
}
