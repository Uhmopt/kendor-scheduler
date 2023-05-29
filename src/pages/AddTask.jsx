import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
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

const roomdata = ["Meeting Room 201", "Meeting Room 101"];

const ModalDlg = () => {
  const navigate = useNavigate();
  const [roomvalue, setRoomValue] = React.useState(roomdata[1]);
  const roomhandleChange = (event) => {
    setRoomValue(event.target.value);
  };

  const persondata = ["Peter", "Alex"];
  const [pvalue, setPValue] = React.useState("Peter");
  const phandleChange = (event) => {
    setPValue(event.target.value);
  };

  const radiodata = [
    {
      label: "Never",
      value: "female",
    },
    {
      label: "After",
      value: "male",
    },
    {
      label: "On",
      value: "other",
    },
  ];

  const [datevalue, setDateValue] = React.useState(new Date());
  const changeDate = ({ value }) => {
    setDateValue(value);
  };

  const [tabSelected, setTabSelected] = React.useState(0);
  const handleTabSelect = (e) => {
    setTabSelected(e.selected);
  };
  
  const [ EventData, setEventData ] = React.useState({
    title: '',
    start: '',
    end: ''
  })

  const handleSubmit = (e) => {

    e.preventDefault();
    // let EventData = new FormData();
    console.log("log", e);
    // navigate("/", { state: EventData });
  };

  return (
    <div style={{ padding: 5 }}>
      <form onSubmit={handleSubmit}>
      <div className="row" style={{ backgroundColor: "lightgrey" }}>
        <div className="col-12">
          <h1>
            Event
            <Link
              to="/"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              style={{ float: "right" }}
            >
              X
            </Link>
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 row-n-p">
          <Label>Title</Label>
          <Input name="title" />
        </div>
      </div>
      <div className="row">
        <div className="col-8 row-n-p">
          <Label>Start</Label>
          <div className="row">
            <div className="col-6 nopadding">
              <DatePicker value={datevalue} onChange={changeDate} />
            </div>
            <div className="col-6 nopadding">
              <TimePicker value={datevalue} onChange={changeDate} />
            </div>
          </div>
        </div>
        <div className="col-4">
          <br />
          <Checkbox label="Specify Time Zone" defaultChecked={false} />
        </div>
      </div>
      <div className="row">
        <div className="col-8 row-n-p">
          <Label>End</Label>
          <div className="row">
            <div className="col-6 nopadding">
              <DatePicker value={datevalue} onChange={changeDate} />
            </div>
            <div className="col-6 nopadding">
              <TimePicker value={datevalue} onChange={changeDate} />
            </div>
          </div>
        </div>
      </div>
      <br />
      <Checkbox defaultChecked={false} />
      <br />
      <Label className="row-n-p">All Day Event</Label>
      <br />
      <Label>Repeat</Label>
      <div className="row">
        <div className="col-12 nopadding">
          <TabStrip selected={tabSelected} onSelect={handleTabSelect}>
            <TabStripTab title="NEVER"></TabStripTab>
            <TabStripTab title="DAILY">
              <div className="row">
                <Label>Repeat every</Label>
                <div className="col-11 row-n-p">
                  <NumericTextBox defaultValue={1} />
                </div>
                <div className="col-1 row-n-p">{"day(s)"}</div>
              </div>
              <Label>End</Label>
              <div className="row">
                <div className="col-2">
                  <RadioGroup data={radiodata} />
                </div>
                <div className="col-8">
                  <br />
                  <NumericTextBox
                    defaultValue={1}
                    min={1}
                    width={80}
                    style={{ margin: "10px 0" }}
                  />
                  occourence(s)
                  <DatePicker value={datevalue} onChange={changeDate} />
                </div>
              </div>
            </TabStripTab>
            <TabStripTab title="WEEKLY">
              <div className="row">
                <Label>Repeat every</Label>
                <div className="col-11 row-n-p">
                  <NumericTextBox defaultValue={1} />
                </div>
                <div className="col-1 row-n-p">{"week(s)"}</div>
              </div>
              <Label>Repeat On</Label>
              <div className="row row-n-p">
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
                  <RadioGroup data={radiodata} />
                </div>
                <div className="col-8">
                  <br />
                  <NumericTextBox
                    defaultValue={1}
                    min={1}
                    width={80}
                    style={{ margin: "10px 0" }}
                  />
                  occourence(s)
                  <DatePicker value={datevalue} onChange={changeDate} />
                </div>
              </div>
            </TabStripTab>
            <TabStripTab title="MONTHLY">
              <div className="row row-n-p">
                <Label>Repeat every</Label>
                <NumericTextBox defaultValue={1} min={1} width="85%" />
                {"month(s)"}
              </div>
              <Label>Repeat On</Label>
              <div className="row row-n-p">
                <RadioButton label="Day" />
                <div className="col-6">
                  <NumericTextBox defaultValue={5} min={1} />
                </div>
              </div>
              <div className="row row-n-p">
                <RadioButton></RadioButton>
                <DropDownList
                  data={["First", "Second", "Third", "Fourth", "Last"]}
                  value={"First"}
                  onChange={roomhandleChange}
                  style={{ width: 100, marginRight: "10px" }}
                />
                <DropDownList
                  data={["First", "Second", "Third", "Fourth", "Last"]}
                  value={"First"}
                  onChange={roomhandleChange}
                  style={{ width: 100 }}
                />
              </div>
              <Label>End</Label>
              <div className="row">
                <div className="col-2">
                  <RadioGroup data={radiodata} />
                </div>
                <div className="col-8">
                  <br />
                  <NumericTextBox
                    defaultValue={1}
                    min={1}
                    width={80}
                    style={{ margin: "10px 0" }}
                  />
                  occourence(s)
                  <DatePicker value={datevalue} onChange={changeDate} />
                </div>
              </div>
            </TabStripTab>
            <TabStripTab title="YEARLY">
              <div className="row row-n-p">
                <Label>Repeat every</Label>
                <NumericTextBox defaultValue={1} min={1} width="85%" />
                {"year(s)"}
              </div>
              <Label>Repeat On</Label>
              <div className="row row-n-p">
                <RadioButton />
                <NumericTextBox
                  defaultValue={5}
                  min={1}
                  width="20%"
                  style={{ marginRight: "1%" }}
                />
                <NumericTextBox defaultValue={1} min={1} width="45%" />
              </div>
              <div className="row row-n-p">
                <RadioButton />
                <DropDownList
                  data={["First", "Second", "Third", "Fourth", "Last"]}
                  value={"First"}
                  onChange={roomhandleChange}
                  style={{ width: "20%", marginRight: "1%" }}
                />
                <DropDownList
                  data={["First", "Second", "Third", "Fourth", "Last"]}
                  value={"First"}
                  onChange={roomhandleChange}
                  style={{ width: "20%", marginRight: "1%" }}
                />
                {` of `}
                <DropDownList
                  data={["First", "Second", "Third", "Fourth", "Last"]}
                  value={"First"}
                  onChange={roomhandleChange}
                  style={{ width: "20%", marginLeft: "1%" }}
                />
              </div>
              <Label>End</Label>
              <div className="row">
                <div className="col-2">
                  <RadioGroup data={radiodata} />
                </div>
                <div className="col-8">
                  <br />
                  <NumericTextBox
                    defaultValue={1}
                    min={1}
                    width={80}
                    style={{ margin: "10px 0" }}
                  />
                  occourence(s)
                  <DatePicker value={datevalue} onChange={changeDate} />
                </div>
              </div>
            </TabStripTab>
          </TabStrip>
        </div>
      </div>
      <div className="row">
        <div className="col-12 row-n-p">
          <Label>Description</Label>
          <TextArea placeholder="" rows={1} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 row-n-p">
          <Label>Rooms</Label>
          <br />
          <DropDownList
            data={roomdata}
            value={roomvalue}
            onChange={roomhandleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 row-n-p">
          <Label>Persons</Label>
          <br />
          <DropDownList
            data={persondata}
            value={pvalue}
            onChange={phandleChange}
          />
        </div>
      </div>
      <button type="submit"
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
      >
        SAVE
      </button>
      <Link
        to="/"
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
      >
        Cancel
      </Link>
      </form>
    </div>
  );
};

export default ModalDlg;
