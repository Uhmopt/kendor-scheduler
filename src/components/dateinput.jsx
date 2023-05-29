import * as React from "react";
import { DatePicker, TimePicker} from "@progress/kendo-react-dateinputs";

const Date_input = () => {
  const [value, setValue] = React.useState(new Date());
  const changeDate = ({
    value
  }) => {
    setValue(value);
  };
  return (
    <div className="row">
      <p>DatePicker</p>
      <DatePicker value={value} onChange={changeDate} />
      <p>TimePicker</p>
      <TimePicker value={value} onChange={changeDate} />
    </div>
  )
};
export default Date_input;