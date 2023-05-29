import * as React from "react";
import {
  Input,
  Checkbox,
  TextArea,
  NumericTextBox,
  RadioGroup,
  RadioButton,
} from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { DatePicker, TimePicker } from "@progress/kendo-react-dateinputs";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ButtonGroup, Button } from "@progress/kendo-react-buttons";

const roomdata = ["Meeting Room 101", "Meeting Room 201"];
const persondata = ["Peter", "Alex"];
const MonthData = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DayData = [
  "Day",
  "Weekday",
  "WeekendDay",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const nowDay = new Number(new Date().getDay());
const repeat_rdata = [
  {
    label: "Never",
    value: "Never",
  },
  {
    label: "After",
    value: "After",
  },
  {
    label: "On",
    value: "On",
  },
];

const ModalDlg = ({ onEvent = (Edata) => {} }) => {
  const [datevalue, setDateValue] = React.useState(new Date());
  const changeDate = ({ value }) => {
    setDateValue(value);
  };

  // Repeat-Tab ChangeEvent
  const [tabSelected, setTabSelected] = React.useState(0);
  const handleTabSelect = (e) => {
    setTabSelected(e.selected);
  };

  // Repeat-radio ChangeEvent
  const [rval, setRval] = React.useState("Never");
  const onChangeRptRadio = (e) => {
    setRval(e.value);
  };
  const [ron, setRon] = React.useState("D");
  const ChangeRepeatOn = (e) => {
    setRon(e.value);
  };

  // Event_Data
  const [EventData, setEventData] = React.useState({
    title: "",
    start_date: new Date(),
    start_time: new Date(),
    end_date: new Date(),
    end_time: new Date(),
    rooms: 0,
    persons: 0,
    description: "",
    isAllDay: false,
  });

  const onChangeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // DropDownList of 'rooms'
    if (name === "rooms") value = roomdata.indexOf(value);

    // DropDownList of 'persons'
    if (name === "persons") value = persondata.indexOf(value);

    // CheckBox of 'All Day Event'
    if (name === "isAllDay") value = !EventData.isAllDay;
    setEventData({ ...EventData, [name]: value });
  };

  // 'Save' Button ClickEvent
  const onSave = (e) => {
    e.preventDefault();
    onEvent(EventData);
  };

  // 'Cancel' Button ClickEvent
  const onCancel = () => {
    onEvent("Cancel");
  };

  return (
    <div style={{ padding: 2 }}>
      {/* 'Title' */}
      <div className="row">
        <div className="col-12 pr-10">
          <Label>Title</Label>
          <Input name="title" onChange={onChangeValue} />
        </div>
      </div>

      {/* 'Start' & 'End' of DateTimes */}
      <div className="row">
        <div className="col-8 pr-10">
          <Label>Start</Label>
          <div className="row">
            <div className="col-6 p-0">
              <DatePicker
                name="start_date"
                value={EventData.start_date}
                onChange={onChangeValue}
              />
            </div>
            <div className="col-6 p-0">
              <TimePicker
                name="start_time"
                value={EventData.start_time}
                onChange={onChangeValue}
                disabled={EventData.isAllDay === true}
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <br />
          <Checkbox label="Specify Time Zone" defaultChecked={false} />
        </div>
      </div>

      <div className="row">
        <div className="col-8 pr-10">
          <Label>End</Label>
          <div className="row">
            <div className="col-6 p-0">
              <DatePicker
                name="end_date"
                value={EventData.end_date}
                onChange={onChangeValue}
              />
            </div>
            <div className="col-6 p-0">
              <TimePicker
                name="end_time"
                value={EventData.end_time}
                onChange={onChangeValue}
                disabled={EventData.isAllDay === true}
              />
            </div>
          </div>
        </div>
      </div>
      <br />

      {/* 'All Day Event' of CheckBox */}
      <Checkbox
        defaultChecked={false}
        name="isAllDay"
        onChange={onChangeValue}
      />
      <br />
      <Label className="pr-10">All Day Event</Label>
      <br />

      {/* Repeat */}
      <Label>Repeat</Label>
      <div className="row">
        <div className="col-12">
          <TabStrip selected={tabSelected} onSelect={handleTabSelect}>
            <TabStripTab title="NEVER"></TabStripTab>

            <TabStripTab title="DAILY">
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
            </TabStripTab>

            <TabStripTab title="WEEKLY">
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
            </TabStripTab>

            <TabStripTab title="MONTHLY">
              <Label>Repeat every</Label>
              <div className="row">
                <div className="col-10 p-0 mb-3">
                  <NumericTextBox defaultValue={1} min={1} max={12} />
                </div>
                <div className="col-1">{"month(s)"}</div>
              </div>
              <Label>Repeat On</Label>
              <div className="row pr-10">
                <RadioButton
                  label="Day"
                  name="Day"
                  value="D"
                  onChange={ChangeRepeatOn}
                  checked={ron === "D"}
                />
                <div className="col-6">
                  <NumericTextBox
                    defaultValue={new Date().getDate()}
                    min={1}
                    max={31}
                    disabled={ron !== "D"}
                    style={{
                      minWidth: "80px",
                    }}
                  />
                </div>
              </div>
              <div className="row pr-10">
                <RadioButton
                  name="First"
                  value="F"
                  onChange={ChangeRepeatOn}
                  checked={ron === "F"}
                ></RadioButton>
                <DropDownList
                  data={["First", "Second", "Third", "Fourth", "Last"]}
                  defaultValue={"First"}
                  style={{
                    width: "20%",
                    minWidth: "100px",
                    marginRight: "2%",
                    marginLeft: "1%",
                  }}
                  disabled={ron !== "F"}
                />
                <DropDownList
                  data={DayData}
                  defaultValue={"Day"}
                  disabled={ron !== "F"}
                  style={{ width: "27%", minWidth: "110px" }}
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
            </TabStripTab>

            <TabStripTab title="YEARLY">
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
            </TabStripTab>
          </TabStrip>
        </div>
      </div>

      {/* Description */}
      <div className="row">
        <div className="col-12 pr-10">
          <Label>Description</Label>
          <TextArea
            placeholder=""
            rows={1}
            name="description"
            value={EventData.description}
            onChange={onChangeValue}
          />
        </div>
      </div>

      {/* 'Rooms' & 'Persons' of DropDownList */}
      <div className="row">
        <div className="col-12 pr-10">
          <Label>Rooms</Label>
          <br />
          <DropDownList
            data={roomdata}
            value={roomdata[EventData.rooms]}
            name="rooms"
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 pr-10">
          <Label>Persons</Label>
          <br />
          <DropDownList
            data={persondata}
            name="persons"
            value={persondata[EventData.persons]}
            onChange={onChangeValue}
          />
        </div>
      </div>
      <hr />

      {/* 'Save' & 'Cancel' of Buttons */}
      <div className="row">
        <div className="col-6">
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            style={{ width: "100%" }}
            onClick={onSave}
          >
            S A V E
          </button>
        </div>

        <div className="col-6">
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            style={{ width: "100%" }}
            onClick={onCancel}
          >
            C a n c e l
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDlg;
