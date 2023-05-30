import * as React from "react";

import { guid } from "@progress/kendo-react-common";
import { timezoneNames } from "@progress/kendo-date-math";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  IntlProvider,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import {
  Scheduler,
  TimelineView,
  DayView,
  WeekView,
  MonthView,
  AgendaView,
} from "@progress/kendo-react-scheduler";
import { Dialog } from "@progress/kendo-react-dialogs";

import "@progress/kendo-date-math/tz/Etc/UTC";
import "@progress/kendo-date-math/tz/Europe/Sofia";
import "@progress/kendo-date-math/tz/Europe/Madrid";
import "@progress/kendo-date-math/tz/Asia/Dubai";
import "@progress/kendo-date-math/tz/Asia/Tokyo";
import "@progress/kendo-date-math/tz/America/New_York";
import "@progress/kendo-date-math/tz/America/Los_Angeles";
import "../themes/kendo-theme-ocean-blue.scss";

import esMessages from "./es.json";
import {
  sampleDataWithCustomSchema,
  displayDate,
  customModelFields,
} from "./events-utc";
import EventDlg from "../components/AddTask";
import { CustomItem } from "../components/schedule_item";

loadMessages(esMessages, "es-ES");

const Home = () => {
  // 'Add_Event' Dialoge of Visible
  const [visible, setVisible] = React.useState(false);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  const timezones = React.useMemo(() => timezoneNames(), []);
  const locales = [
    {
      language: "en-US",
      locale: "en",
    },
    {
      language: "es-ES",
      locale: "es",
    },
  ];

  const [view, setView] = React.useState("day");
  const [date, setDate] = React.useState(displayDate);
  const [locale, setLocale] = React.useState(locales[0]);
  const [timezone, setTimezone] = React.useState("Etc/UTC");
  const [orientation, setOrientation] = React.useState("horizontal");
  const [data, setData] = React.useState(sampleDataWithCustomSchema);

  const handleViewChange = React.useCallback(
    (event) => {
      setView(event.value);
    },
    [setView]
  );

  const handleDateChange = React.useCallback(
    (event) => {
      setDate(event.value);
    },
    [setDate]
  );

  const handleLocaleChange = React.useCallback(
    (event) => {
      setLocale(event.target.value);
    },
    [setLocale]
  );

  const handleTimezoneChange = React.useCallback(
    (event) => {
      setTimezone(event.target.value);
    },
    [setTimezone]
  );

  const handleOrientationChange = React.useCallback((event) => {
    setOrientation(event.target.getAttribute("data-orientation"));
  }, []);

  const handleDataChange = React.useCallback(
    ({ created, updated, deleted }) => {
      setData((old) =>
        old
          .filter(
            (item) =>
              deleted.find((current) => current.TaskID === item.TaskID) ===
              undefined
          )
          .map(
            (item) =>
              updated.find((current) => current.TaskID === item.TaskID) || item
          )
          .concat(
            created.map((item) =>
              Object.assign({}, item, {
                TaskID: guid(),
              })
            )
          )
      );
      console.log({ created, updated, deleted });
    },
    [setData]
  );

  // From Dialoge, Close Dialoge
  const onEvent = (Edata) => {
    if (Edata === "Cancel") {
      toggleDialog();
      return;
    }
    let start = new Date();
    let end = new Date();
    let date;

    if (Edata.isAllDay) start.setTime(0);
    else start.setTime(Edata.start_time.getTime());
    start.setHours(Edata.start_time.getHours());
    start.setMilliseconds(start.getMilliseconds() + 8 * 3600 * 1000); // add 8 hours
    date = Edata.start_date.getDate();
    if (start.getHours() <= 8) start.setDate(date + 1);
    else start.setDate(date);
    start.setDate(Edata.start_date.getDate());
    start.setMonth(Edata.start_date.getMonth());
    start.setFullYear(new Date().getFullYear());

    if (Edata.isAllDay) end.setTime(0);
    else end.setTime(Edata.end_time.getTime());
    end.setMilliseconds(end.getMilliseconds() + 8 * 3600 * 1000); // add 8 hours
    date = Edata.end_date.getDate();
    if (end.getHours() <= 8) end.setDate(date + 1);
    else end.setDate(date);
    end.setMonth(Edata.end_date.getMonth());
    end.setFullYear(new Date().getFullYear());

    let createData = {
      Title: Edata.title,
      Start: start,
      End: end,
      PersonIDs: Edata.persons + 1,
      RoomID: Edata.rooms + 1,
      Description: Edata.description,
      isAllDay: Edata.isAllDay,
    };
    let cData = new Array(1);
    cData[0] = createData;
    toggleDialog();
    handleDataChange({ created: cData, updated: [], deleted: [] });
  };

  return (
    <div>
      <div className="example-config">
        <div className="row">
          <div className="col mb-3">
            <h5>Timezone:</h5>
            <DropDownList
              value={timezone}
              onChange={handleTimezoneChange}
              data={timezones}
            />
          </div>
          <div className="col mb-3">
            <h5>Locale:</h5>
            <DropDownList
              // value={locale}
              // onChange={handleLocaleChange}
              defaultValue={locale}
              data={locales}
              textField="language"
              dataItemKey="locale"
            />
          </div>
          <div className="col">
            <h5>Orientation:</h5>
            <input
              type="radio"
              name="orientation"
              id="horizontal"
              data-orientation="horizontal"
              className="k-radio k-radio-md"
              checked={orientation === "horizontal"}
              onChange={handleOrientationChange}
            />
            <label className="k-radio-label" htmlFor="horizontal">
              Horizontal
            </label>
            <br />
            <input
              type="radio"
              name="orientation"
              id="vertical"
              data-orientation="vertical"
              className="k-radio k-radio-md"
              checked={orientation === "vertical"}
              onChange={handleOrientationChange}
            />
            <label className="k-radio-label" htmlFor="vertical">
              Vertical
            </label>
          </div>
          <div className="col">
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={toggleDialog}
            >
              + Event
            </button>
          </div>
        </div>
      </div>
      <LocalizationProvider language={locale.language}>
        <IntlProvider locale={locale.locale}>
          <Scheduler
            data={data}
            onDataChange={handleDataChange}
            view={view}
            onViewChange={handleViewChange}
            date={date}
            onDateChange={handleDateChange}
            editable={{
              select: true,
              remove: true,
              drag: true,
              resize: true,
              add: true,
              edit: true,
            }}
            timezone={timezone}
            modelFields={customModelFields}
            item={CustomItem}
            group={{ resources: ["Rooms", "Persons"], orientation }}
            resources={[
              {
                name: "Rooms",
                data: [
                  {
                    text: "Meeting Room 101",
                    value: 1,
                  },
                  {
                    text: "Meeting Room 201",
                    value: 2,
                    color: "#FF7272",
                  },
                ],
                field: "RoomID",
                valueField: "value",
                textField: "text",
                colorField: "color",
              },
              {
                name: "Persons",
                data: [
                  {
                    text: "Peter",
                    value: 1,
                    color: "#5392E4",
                  },
                  {
                    text: "Alex",
                    value: 2,
                    color: "#54677B",
                  },
                ],
                field: "PersonIDs",
                valueField: "value",
                textField: "text",
                colorField: "color",
              },
            ]}
          >
            <TimelineView />
            <DayView />
            <WeekView />
            <MonthView />
            <AgendaView />
          </Scheduler>
        </IntlProvider>
      </LocalizationProvider>
      {visible && (
        <Dialog
          title={"Event"}
          onClose={toggleDialog}
          height={"90%"}
          maxWidth={"70%"}
        >
          <EventDlg onEvent={onEvent} />
        </Dialog>
      )}
    </div>
  );
};

export default Home;
