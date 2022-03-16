import { useState, Dispatch } from "react";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MarkTimes from "./MarkTimes";
import PollDateTimeWithCheck from "./PollDateTimeWithCheck";
import { Time, PollFromDB, Vote } from "../../models/poll";
import { slotTimeClassName } from "../../helpers";

dayjs.extend(localizedFormat);

const PollTableVoter = (props: {
  pollFromDB: PollFromDB;
  sortedTimes: Time[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { pollFromDB, sortedTimes, newVote, setNewVote } = props;

  const [tourRun, setTourRun] = useState<boolean>(false);

  // Run automatically for first time users
  if (typeof window !== "undefined") {
    if (localStorage.voterVisited !== "true") {
      localStorage.setItem("voterVisited", "true");
      setTourRun(true);
    }
  }

  const tourSteps: Step[] = [
    {
      disableBeacon: true,
      target: "#poll-vote-table",
      content:
        "Enter your name and choose which times work for you. Tick a checkbox to vote 'yes' (green) and then tick the new, smaller checkbox below it to vote 'if need be' (yellow inside circle). The times are shown in your time zone.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status) || type === "beacon") {
      setTourRun(false);
    }
  };

  return (
    <div className="poll-info-div" id="poll-vote-table">
      <Joyride
        callback={handleJoyrideCallback}
        steps={tourSteps}
        run={tourRun}
        disableScrolling
        spotlightClicks
        styles={{
          buttonClose: { visibility: "hidden" },
          options: {
            primaryColor: "#000",
          },
        }}
      />
      <Table responsive className="poll-table">
        <thead>
          <tr className="poll-table-top-row">
            <th className="participant-cell"> </th>
            {sortedTimes.map((time) => (
              <th
                key={time.start}
                className={slotTimeClassName(
                  time,
                  newVote.times,
                  pollFromDB.finalTime
                )}
              >
                <PollDateTimeWithCheck time={time} voteTimes={newVote.times} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pollFromDB.open && (
            <MarkTimes
              times={sortedTimes}
              newVote={newVote}
              setNewVote={setNewVote}
            />
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PollTableVoter;
