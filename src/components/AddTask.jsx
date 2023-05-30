import * as React from "react";
import { Input, Checkbox, TextArea } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { DatePicker, TimePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ButtonGroup, Button } from "@progress/kendo-react-buttons";
import { Daily, Weekly, Monthly, Yearly } from "./Repeat";
import { roomdata, persondata, timezonedata } from "./Repeat/utils";

const ModalDlg = ({ onEvent = (Edata) => {} }) => {
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

  // 'Repeat' of BottonGroup
  const [rpton, setRpton] = React.useState("NEVER");
  const ClickBtnGroup = (e) => {
    setRpton(e.target.innerText);
  };

  // 'TimeZone' of CheckBox
  const [timezone_s, setTimezone_s] = React.useState(false);
  const ChangeChecked_s = () => {
    setTimezone_s(!timezone_s);
  };

  const [timezone_e, setTimezone_e] = React.useState(false);
  const ChangeChecked_e = () => {
    setTimezone_e(!timezone_e);
  };

  return (
    <div style={{ padding: 2 }}>
      {/* 'Title' */}
      <Label>Title</Label>
      <div className="row mb-3">
        <Input name="title" onChange={onChangeValue} />
      </div>

      {/* 'Start' of DateTimes */}
      <div className="row">
        <div className="col-6 pr-10">
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
        <div className="col-6">
          <br />
          <Checkbox
            label="Specify Time Zone"
            defaultChecked={false}
            onClick={ChangeChecked_s}
          />
        </div>
      </div>

      {/* Specify Time zone */}
      <Label style={{ display: timezone_s ? "" : "none" }}>
        Start Time Zone
      </Label>
      <div className="row p-0 m-0">
        <DropDownList
          style={{ display: timezone_s ? "" : "none" }}
          data={timezonedata}
          name="timezone_s"
          required
        />
      </div>

      {/* 'End' of DateTimes */}
      <div className="row">
        <div className="col-6 pr-10 mr-10">
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
        <div className="col-5 p-0">
          <br />
          <Checkbox
            label={timezone_s ? "End TimeZone" : ""}
            defaultChecked={false}
            onClick={ChangeChecked_e}
            style={{ display: timezone_s ? "" : "none" }}
          />
        </div>
      </div>

      {/* Specify Time zone */}
      <Label style={{ display: timezone_e ? "" : "none" }}>
        Start Time Zone
      </Label>
      <div className="row p-0 m-0">
        <DropDownList
          style={{ display: timezone_e & timezone_s ? "" : "none" }}
          data={timezonedata}
          name="timezone_e"
          required
        />
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
      <div className="row p-0 mt-2 mb-3">
        <ButtonGroup width="100%" className="btn_group">
          <Button
            togglable={true}
            selected={rpton === "NEVER"}
            onClick={ClickBtnGroup}
          >
            NEVER
          </Button>
          <Button
            togglable={true}
            selected={rpton === "DAILY"}
            onClick={ClickBtnGroup}
          >
            DAILY
          </Button>
          <Button
            togglable={true}
            selected={rpton === "WEEKLY"}
            onClick={ClickBtnGroup}
          >
            WEEKLY
          </Button>
          <Button
            togglable={true}
            selected={rpton === "MONTHLY"}
            onClick={ClickBtnGroup}
          >
            MONTHLY
          </Button>
          <Button
            togglable={true}
            selected={rpton === "YEARLY"}
            onClick={ClickBtnGroup}
          >
            YEARLY
          </Button>
        </ButtonGroup>
      </div>

      {rpton === "DAILY" && <Daily />}
      {rpton === "WEEKLY" && <Weekly />}
      {rpton === "MONTHLY" && <Monthly />}
      {rpton === "YEARLY" && <Yearly />}

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
