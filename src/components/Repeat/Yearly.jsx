import * as React from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  NumericTextBox,
  RadioButton,
  RadioGroup,
} from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { DayData, MonthData, repeat_rdata } from "./utils";

export const Yearly = () => {
  const [datevalue, setDateValue] = React.useState(new Date());
  const changeDate = ({ value }) => {
    setDateValue(value);
  };

  const [ron, setRon] = React.useState("D");
  const ChangeRepeatOn = (e) => {
    setRon(e.value);
  };

  // Repeat-radio ChangeEvent
  const [rval, setRval] = React.useState("Never");
  const onChangeRptRadio = (e) => {
    setRval(e.value);
  };

  return (
    <>
      <Label>Repeat every</Label>
      <div className="row">
        <div className="col-10 p-0 mb-3">
          <NumericTextBox defaultValue={1} min={1} />
        </div>
        <div className="col-1">{"year(s)"}</div>
      </div>
      <Label>Repeat On</Label>
      <div className="row pr-10">
        <RadioButton
          name="Day"
          value="D"
          onChange={ChangeRepeatOn}
          checked={ron === "D"}
        />
        <DropDownList
          data={MonthData}
          defaultValue={MonthData[new Date().getMonth()]}
          style={{ marginRight: "1%", width: "40%", marginLeft: "2%" }}
          disabled={ron !== "D"}
        />
        <NumericTextBox
          defaultValue={new Date().getDate()}
          min={1}
          max={31}
          width="20%"
          disabled={ron !== "D"}
        />
      </div>
      <div className="row pr-10">
        <RadioButton
          name="First"
          value="F"
          onChange={ChangeRepeatOn}
          checked={ron === "F"}
        />
        <DropDownList
          data={["First", "Second", "Third", "Fourth", "Last"]}
          defaultValue={"First"}
          disabled={ron !== "F"}
          style={{ width: "22%", marginRight: "2%", marginLeft: "2%" }}
        />
        <DropDownList
          data={DayData}
          defaultValue={"Day"}
          disabled={ron !== "F"}
          style={{ width: "25%", marginRight: "2%" }}
        />
        {` of `}
        <DropDownList
          data={MonthData}
          defaultValue={MonthData[new Date().getMonth()]}
          disabled={ron !== "F"}
          style={{ width: "25%", marginLeft: "2%" }}
        />
      </div>
      <Label>End</Label>
      <div className="row">
        <div className="col-2">
          <RadioGroup
            data={repeat_rdata}
            defaultValue={"Never"}
            value={rval}
            name="rpt"
            onChange={onChangeRptRadio}
          />
        </div>
        <div className="col-8">
          <br />
          <NumericTextBox
            defaultValue={1}
            min={1}
            width={80}
            style={{ margin: "1% 0" }}
            name="after_rpt"
            disabled={rval !== "After"}
          />
          occourence(s)
          <DatePicker
            value={datevalue}
            onChange={changeDate}
            disabled={rval !== "On"}
            name="On_rpt"
          />
        </div>
      </div>
    </>
  );
};
