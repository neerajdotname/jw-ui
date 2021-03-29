import React, { useState } from 'react';
import * as dayjs from "dayjs";
import {
  Input,
  Select,
  Radio,
  Checkbox,
  DateInput,
  DateRangeInput,
  TimeInput,
  Slider,
} from "../../lib";
import { isEmpty } from "ramda";

import Header from '../Header';

const FormElements = () => {

  const SELECT_OPTIONS = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
  ];

  const [name, setName] = useState("");
  const [time, setTime] = useState(dayjs().toDate());
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [sliderCount, setSliderCount] = useState(0);
  
  const [startDate, setStartDate] = useState(
    dayjs("04-12-2020", "DD-MM-YYYY").toDate()
  );
  const [endDate, setEndDate] = useState(
    dayjs("04-12-2020", "DD-MM-YYYY").toDate()
  );

  return (
    <div className="w-full">
      <Header title="Form Elements"/>
      <div className="flex flex-col items-start justify-start p-6">
        <div className="grid w-2/3 grid-cols-2 gap-6 mb-8">
          <Input
            type="text"
            label="Input"
            value={name}
            placeholder="Type Something"
            onChange={(e) => setName(e.target.value)}
            error={isEmpty(name) && "Your name required*"}
            maxLength={32}
          />
          <Select
            label="Select"
            className="mb-8"
            placeholder="Select..."
            value={selectedAnswer}
            options={SELECT_OPTIONS}
            onChange={(e) => setSelectedAnswer(e)}
          />
        </div>
        <div className="grid w-2/3 grid-cols-2 gap-6 mb-12">
          <DateInput
            label="Date Input"
            value={startDate}
            onChange={(startDate) => {
              setStartDate(startDate);
            }}
          />
          <DateRangeInput
            label="Date Range Input"
            value={[startDate, endDate]}
            onChange={([startDate, endDate]) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            minDate={dayjs("2019-01-01").toDate()}
            maxDate={dayjs().toDate()}
          />
        </div>
        <div className="grid w-2/3 grid-cols-2 gap-6 mb-12">
          <div className="grid grid-cols-2 gap-2">
            <Checkbox id="uniqueId" name="checkbox" label="Checkbox 1" />
            <Checkbox id="uniqueId" name="checkbox" label="Checkbox 2" />
          </div>
          <Radio>
            <Radio.Item label="Radio 1" value={1}/>
            <Radio.Item label="Radio 2" value={2}/>
            <Radio.Item label="Radio 3" value={3}/>
          </Radio>
        </div>
        <div className="grid w-2/3 grid-cols-2 gap-6">
          <TimeInput
            label="Time"
            value={time}
            onChange={(value) => setTime(value)}
          />
          <div className="px-2">
            <Slider
              min={0}
              max={10}
              label="Slider"
              stepSize={1}
              labelStepSize={10}
              value={sliderCount}
              onChange={(value) => {
                setSliderCount(value);
              }}
              labelProps={{
                className: "mb-3 -ml-2"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormElements;
