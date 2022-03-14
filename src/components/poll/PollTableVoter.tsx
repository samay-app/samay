import { useState, Dispatch } from "react";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MarkChoices from "./MarkChoices";
import PollDateTimeWithCheck from "./PollDateTimeWithCheck";
import { Choice, PollFromDB, Vote } from "../../models/poll";
import { slotTimeClassName } from "../../helpers";

dayjs.extend(localizedFormat);

const PollTableVoter = (props: {
  pollFromDB: PollFromDB;
  sortedChoices: Choice[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { pollFromDB, sortedChoices, newVote, setNewVote } = props;

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
            {sortedChoices.map((choice) => (
              <th
                key={choice.start}
                className={slotTimeClassName(
                  choice,
                  newVote.choices,
                  pollFromDB.finalChoice
                )}
              >
                <PollDateTimeWithCheck
                  choice={choice}
                  voteChoices={newVote.choices}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pollFromDB.open && (
            <MarkChoices
              choices={sortedChoices}
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
