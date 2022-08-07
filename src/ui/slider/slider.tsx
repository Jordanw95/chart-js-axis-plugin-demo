import React, { useState, useCallback } from 'react';
import Text from '../../ui/text';
import styles from './style.css';
import { debounce } from 'lodash';

interface sliderProps {
  max: string | number;
  min: string | number;
  startingVal: string;
  label: string;
  debounceTime?: number;
  onChange: (input: number) => void;
}

const Slider = ({
  max,
  min,
  startingVal,
  label,
  onChange,
  debounceTime = 10,
}: sliderProps): React.ReactElement => {
  const [value, setValue] = useState<string | number>(startingVal);

  const bubbleChange = (inputValue: number) => {
    onChange(inputValue);
  };

  const [debouncedChange] = useState(() => 
    debounce(bubbleChange, debounceTime)
  )

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
      const eventTarget = event.target as HTMLInputElement;
      const inputValue = Number(eventTarget.value);
      setValue(inputValue);
    debouncedChange(inputValue)
  };
  return (
    <div className={styles['slider-container']}>
      <Text>{label}</Text>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onInput={(event) => handleChange(event)}
        className="slider"
        id="myRange"
      ></input>
    </div>
  );
};

export default Slider;
