import dayjs from "dayjs";
import { Table, InputGroup } from "react-bootstrap";

const TimeSlot = (props: {
  timeFactor: number;
  timeSlotArray: number[];
}): JSX.Element => {
  const { timeFactor } = props;
  let today = dayjs().startOf("d"); // start of today as the initial time

  function handleChange(event: {
    target: { value: number; checked: boolean };
  }): void {
    const { value, checked } = event.target;
    if (checked) {
      props.timeSlotArray.push(value);
    } else {
      props.timeSlotArray.splice(props.timeSlotArray.indexOf(value), 1); // remove the unchecked element from array
    }
  }

  return (
    <Table responsive striped bordered size="sm">
      <thead>
        <tr>
          <th>Time Range</th>
          {Array.from({ length: 7 }).map((_, index) => (
            <th key={today.add(index, "day")}>
              {today.add(index, "day").format("MMM [\n] DD [\n] ddd")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 24 / timeFactor }).map((_, i) => (
          <tr key={today.add(i * timeFactor, "h")}>
            <td>{`${today
              .add(i * timeFactor, "h")
              .format("hh:mm a")} - ${today
              .add((i + 1) * timeFactor, "h")
              .format("hh:mm a")}`}</td>
            {Array.from({ length: 7 }).map((__, index) => (
              <td key={today.add(i * timeFactor, "h").add(index, "day")}>
                <InputGroup>
                  <InputGroup.Checkbox
                    onChange={handleChange}
                    value={today
                      .add(i * timeFactor, "h")
                      .add(index, "day")
                      .unix()}
                  />
                </InputGroup>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TimeSlot;
