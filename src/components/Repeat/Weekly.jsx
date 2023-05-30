import * as React from "react";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { NumericTextBox, RadioGroup } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { repeat_rdata } from "./utils";

export const Weekly = () => {
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
          <NumericTextBox defaultValue={1} min={1} max={5} />
        </div>
        <div className="col-1">{"week(s)"}</div>
      </div>
      <Label>Repeat On</Label>
      <div className="row pr-10">
        <ButtonGroup>
          <Button togglable={true}>SUN</Button>
          <Button togglable={true}>MON</Button>
          <Button togglable={true}>TUE</Button>
          <Button togglable={true}>WED</Button>
          <Button togglable={true}>THU</Button>
          <Button togglable={true}>FRI</Button>
          <Button togglable={true}>SAT</Button>
        </ButtonGroup>
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
