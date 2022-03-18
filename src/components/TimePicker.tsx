import { useState, Dispatch } from "react";
import { Table, Form } from "react-bootstrap";
import { Time } from "../models/poll";
import { timeIntervalsInADay } from "../helpers/constants";
import { generateNumArray } from "../helpers";

const TimePicker = (props: {
  pollTimes: Time[];
  setPollTimes: Dispatch<Time[]>;
}): JSX.Element => {
  const { pollTimes, setPollTimes } = props;

  const currentDate = new Date();
  const startTimestamp = Math.floor(
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ).getTime() / 1000
  );

  const [activeCheckbox, setActiveCheckbox] = useState<{
    time: number;
    column: number;
  }>({ time: 0, column: 0 });

  const [checkboxPairs, setCheckboxPairs] = useState<
    {
      id1: string;
      id2: string;
    }[]
  >([]);

  const [disabledCheckboxes, setDisabledCheckboxes] = useState<string[]>([]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { dataset, checked } = e.target;
    const currrentCheckboxTime: number = dataset.value
      ? parseInt(dataset.value.split("-")[0], 10)
      : 0;
    const currrentCheckboxColumn: number = dataset.value
      ? parseInt(dataset.value.split("-")[1], 10)
      : 0;
    if (checked) {
      if (!activeCheckbox.time && !activeCheckbox.column) {
        const newCheckboxPair = {
          id1: `${currrentCheckboxTime}-${currrentCheckboxColumn}`,
          id2: "null",
        };
        setCheckboxPairs((existingPairs) => [
          ...existingPairs,
          newCheckboxPair,
        ]);
        setActiveCheckbox({
          time: currrentCheckboxTime,
          column: currrentCheckboxColumn,
        });
      } else {
        const newPollTime: Time = {
          start: Math.min(activeCheckbox.time, currrentCheckboxTime),
          end: Math.max(activeCheckbox.time, currrentCheckboxTime),
        };
        const checkboxesToDisable = generateNumArray(
          Math.min(activeCheckbox.time, currrentCheckboxTime) + 900,
          Math.max(activeCheckbox.time, currrentCheckboxTime),
          900
        ).map((checkbox) => `${checkbox}-${currrentCheckboxColumn}`);

        setDisabledCheckboxes([...disabledCheckboxes, ...checkboxesToDisable]);
        let newCheckboxPairs = checkboxPairs;
        newCheckboxPairs = newCheckboxPairs.filter(
          (pair) =>
            pair.id1 !== `${activeCheckbox.time}-${activeCheckbox.column}`
        );
        const newCheckboxPair = {
          id1: `${activeCheckbox.time}-${activeCheckbox.column}`,
          id2: `${currrentCheckboxTime}-${currrentCheckboxColumn}`,
        };
        setCheckboxPairs([...newCheckboxPairs, newCheckboxPair]);
        setPollTimes([...pollTimes, newPollTime]);
        setActiveCheckbox({ time: 0, column: 0 });
      }
    } else if (
      !checked &&
      activeCheckbox.time &&
      activeCheckbox.column &&
      activeCheckbox.time === currrentCheckboxTime &&
      activeCheckbox.column === currrentCheckboxColumn
    ) {
      let newCheckboxPairs = checkboxPairs;
      newCheckboxPairs = newCheckboxPairs.filter(
        (pair) =>
          pair.id1 !== `${currrentCheckboxTime}-${currrentCheckboxColumn}`
      );
      setCheckboxPairs([...newCheckboxPairs]);
      setActiveCheckbox({ time: 0, column: 0 });
    } else {
      let oldCheckboxPair;
      let updatedCheckboxPair;
      let newCheckboxPairs = checkboxPairs;
      let newCheckboxTime = 0;
      let newCheckboxColumn = 0;
      let newPollTimes = pollTimes;
      oldCheckboxPair = checkboxPairs.find(
        (pair) =>
          pair.id1 === `${currrentCheckboxTime}-${currrentCheckboxColumn}`
      );
      if (oldCheckboxPair) {
        newCheckboxTime = parseInt(oldCheckboxPair.id2.split("-")[0], 10);
        newCheckboxColumn = parseInt(oldCheckboxPair.id2.split("-")[1], 10);
        newCheckboxPairs = newCheckboxPairs.filter(
          (pair) =>
            pair.id1 !== `${currrentCheckboxTime}-${currrentCheckboxColumn}`
        );
      } else {
        oldCheckboxPair = checkboxPairs.find(
          (pair) =>
            pair.id2 === `${currrentCheckboxTime}-${currrentCheckboxColumn}`
        );
        if (oldCheckboxPair) {
          newCheckboxTime = parseInt(oldCheckboxPair.id1.split("-")[0], 10);
          newCheckboxColumn = parseInt(oldCheckboxPair.id1.split("-")[1], 10);
          newCheckboxPairs = newCheckboxPairs.filter(
            (pair) =>
              pair.id2 !== `${currrentCheckboxTime}-${currrentCheckboxColumn}`
          );
        }
      }
      updatedCheckboxPair = {
        id1: `${newCheckboxTime}-${newCheckboxColumn}`,
        id2: "null",
      };
      setCheckboxPairs([...newCheckboxPairs, updatedCheckboxPair]);
      newPollTimes.splice(
        newPollTimes.findIndex(
          (pollTime) =>
            pollTime.start ===
              Math.min(newCheckboxTime, currrentCheckboxTime) &&
            pollTime.end === Math.max(newCheckboxTime, currrentCheckboxTime)
        ),
        1
      );
      setPollTimes([...newPollTimes]);
      setActiveCheckbox({ time: newCheckboxTime, column: newCheckboxColumn });
    }
  };

  const getDayAndMonth = (
    timestamp: number
  ): { day: number; month: number } => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return { day, month };
  };

  return (
    <Table responsive className="timepicker-table">
      <thead>
        <tr className="timepicker-day-header">
          <th className="timepicker-colum timepicker-time">#</th>
          {[...Array(7).keys()].map((day) => (
            <th key={day} className="timepicker-column">
              {getDayAndMonth(startTimestamp + day * 86400).day},{" "}
              {getDayAndMonth(startTimestamp + day * 86400).month}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeIntervalsInADay.map((time, minutesIdx) => (
          <tr key={time}>
            <td className="timepicker-column timepicker-time">{time}</td>
            {[...Array(7).keys()].map((day) => (
              <td key={day} className="timepicker-column">
                <Form.Check
                  id={`${startTimestamp + day * 86400 + minutesIdx * 900}-1`}
                  className={`${
                    startTimestamp + day * 86400 + minutesIdx * 900
                  }-1`}
                  inline
                  data-value={`${
                    startTimestamp + day * 86400 + minutesIdx * 900
                  }-1`}
                  checked={checkboxPairs.some(
                    (pair) =>
                      pair.id1 ===
                        `${
                          startTimestamp + day * 86400 + minutesIdx * 900
                        }-1` ||
                      pair.id2 ===
                        `${startTimestamp + day * 86400 + minutesIdx * 900}-1`
                  )}
                  disabled={
                    activeCheckbox.column === 2 || activeCheckbox.column === 3
                  }
                  hidden={disabledCheckboxes.some(
                    (checkbox) =>
                      checkbox ===
                      `${startTimestamp + day * 86400 + minutesIdx * 900}-1`
                  )}
                  onChange={handleTimeChange}
                />
                <div
                  className="vl"
                  hidden={
                    !disabledCheckboxes.some(
                      (checkbox) =>
                        checkbox ===
                        `${startTimestamp + day * 86400 + minutesIdx * 900}-1`
                    )
                  }
                />
                <Form.Check
                  id={`${startTimestamp + day * 86400 + minutesIdx * 900}-2`}
                  inline
                  data-value={`${
                    startTimestamp + day * 86400 + minutesIdx * 900
                  }-2`}
                  checked={checkboxPairs.some(
                    (pair) =>
                      pair.id1 ===
                        `${
                          startTimestamp + day * 86400 + minutesIdx * 900
                        }-2` ||
                      pair.id2 ===
                        `${startTimestamp + day * 86400 + minutesIdx * 900}-2`
                  )}
                  disabled={
                    activeCheckbox.column === 1 || activeCheckbox.column === 3
                  }
                  onChange={handleTimeChange}
                />
                <div
                  className="vl"
                  hidden={
                    !disabledCheckboxes.some(
                      (checkbox) =>
                        checkbox ===
                        `${startTimestamp + day * 86400 + minutesIdx * 900}-2`
                    )
                  }
                />
                <Form.Check
                  id={`${startTimestamp + day * 86400 + minutesIdx * 900}-3`}
                  inline
                  data-value={`${
                    startTimestamp + day * 86400 + minutesIdx * 900
                  }-3`}
                  checked={checkboxPairs.some(
                    (pair) =>
                      pair.id1 ===
                        `${
                          startTimestamp + day * 86400 + minutesIdx * 900
                        }-3` ||
                      pair.id2 ===
                        `${startTimestamp + day * 86400 + minutesIdx * 900}-3`
                  )}
                  disabled={
                    activeCheckbox.column === 1 || activeCheckbox.column === 2
                  }
                  onChange={handleTimeChange}
                />
                <div
                  className="vl"
                  hidden={
                    !disabledCheckboxes.some(
                      (checkbox) =>
                        checkbox ===
                        `${startTimestamp + day * 86400 + minutesIdx * 900}-3`
                    )
                  }
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TimePicker;
