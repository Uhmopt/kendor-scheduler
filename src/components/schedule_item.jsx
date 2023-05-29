import { useInternationalization } from "@progress/kendo-react-intl";
import { Popup } from "@progress/kendo-react-popup";
import { SchedulerItem } from "@progress/kendo-react-scheduler";
import * as React from "react";

export const CustomItem = (props) => {
  const ref = React.useRef(null);
  const intl = useInternationalization();
  const [show, setShow] = React.useState(false);
  const { onFocus, onBlur } = props;
  const handleFocus = React.useCallback(
    (event) => {
      setShow(true);

      // Call the default `onFocus` handler
      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus]
  );
  const handleBlur = React.useCallback(
    (event) => {
      setShow(false);

      // Call the default `onBlur` handler
      if (onBlur) {
        onBlur(event);
      }
    },
    [onBlur]
  );
  return (
    <React.Fragment>
      <SchedulerItem
        {...props}
        style={{
          ...props.style,
        }}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Popup
        show={show}
        anchorAlign={{
          horizontal: "center",
          vertical: "top",
        }}
        popupAlign={{
          horizontal: "center",
          vertical: "bottom",
        }}
        anchor={ref.current && ref.current.element}
      >
        <div
          className="rounded"
          style={{
            overflow: "hidden",
          }}
        >
          <div className="p-1">
            <h6>Title:{props.title}</h6>
            <h6>Description:{props.description}</h6>
            <div>Start: {intl.formatDate(props.zonedStart, "t")}</div>
            <div>End: {intl.formatDate(props.zonedEnd, "t")}</div>
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};
