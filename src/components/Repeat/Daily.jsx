import * as React from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { NumericTextBox, RadioGroup } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { repeat_rdata } from "./utils";

export const Daily = () => {
  const [datevalue, setDateValue] = React.useState(new Date());
  const changeDate = ({ value }) => {
    setDateValue(value);
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
        <div className="col-1">{"day(s)"}</div>
      </div>
      <Label>End</Label>
      <div className="row">
        <div className="col-2">
          <RadioGroup
            data={repeat_rdata}
            defaultValue={rval}
            value={rval}
            name="rpt"
            onChange={onChangeRptRadio}
          />
        </div>
        <div className="col-6">
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
