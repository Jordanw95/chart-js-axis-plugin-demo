import { ScriptableContext } from 'chart.js';

export type Data = {
  datasets: {
    data: {
      x: string;
      y: number;
    }[];
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
}
