import { ScriptableContext } from 'chart.js';
import { Data, ChartOpts, ColorOpts, ColorFunction, Datapoint } from '../../common/types';

type RenderStep = (dpArray: Datapoint[], timeout: number) => void;

export type SortFunction  = (data: Data, stepTime: number, renderStep: RenderStep) => number;

export const sortingFunctions = {
    bubbleSort: (data: Data, stepTime: number, renderStep: RenderStep): number => {
        let dpArray = [...data.datasets[0].data]
        let swapped;
        const swap = (dpArray: Datapoint[], i: number): void=> {
            [dpArray[i], dpArray[i+1]] = [dpArray[i+1], dpArray[i]]
            }
        let timeout = 0;
        do{
            swapped = false
            for (let i = 0; i < dpArray.length - 1; i++){
                if (dpArray[i].y > dpArray[i + 1].y){
                    swap(dpArray, i)
                    timeout += stepTime;
                    renderStep(dpArray.slice(0), timeout)
                    swapped = true
                }
            }
        }while(swapped)
        return timeout;
    }
}

export const COLOR_FUNCTIONS = {
    steppingHue: (
      context: ScriptableContext<'bar'>,
      data: Data,
      colorOpts: ColorOpts
    ): string => {
      const { baseHue, hueSpan } = colorOpts;
      const hueStepSize =
        hueSpan / data.datasets[context.datasetIndex].data.length;
      const hue = baseHue;
      const shadingIndex = context.dataIndex;
      return `hsl(${hue + hueStepSize * shadingIndex},100%,75%)`;
    },
    colorByScore: (context: ScriptableContext<'bar'>, data: Data, ColorOpts: ColorOpts): string => {
      const maxRange = context.chart.scales.y.max - context.chart.scales.y.min;
      const gradingConstant = 100 / maxRange;
      const hue = gradingConstant * context.parsed.y;
      return `hsl(${gradingConstant * context.parsed.y},100%,50%)`;
    },
  };

  export const defaultOpts: ChartOpts = {
    colorOpts: {
      baseHue: 206,
      hueSpan: 30,
    },
    borderRadius: 4,
    colorFunction: COLOR_FUNCTIONS.colorByScore,
    animations: true
  };