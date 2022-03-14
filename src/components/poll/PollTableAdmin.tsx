import { Dispatch, useState } from "react";
import { Table } from "react-bootstrap";
import { Check2, Check2Circle } from "react-bootstrap-icons";
import dayjs from "dayjs";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MarkFinalChoice from "./MarkFinalChoice";
import PollDateTime from "./PollDateTime";
import { Choice, PollFromDB, Vote } from "../../models/poll";
import {
  isChoicePresentInPollChoices,
  slotCheckClassName,
  isChoiceIfNeedBe,
} from "../../helpers";

dayjs.extend(localizedFormat);

const PollTableAdmin = (props: {
  pollFromDB: PollFromDB;
  sortedChoices: Choice[];
  setFinalChoice: Dispatch<Choice | undefined>;
}): JSX.Element => {
  const { pollFromDB, sortedChoices, setFinalChoice } = props;

  const [tourRun, setTourRun] = useState<boolean>(false);

  // Run automatically for first time users
  if (typeof window !== "undefined") {
    if (localStorage.adminVisited !== "true") {
      localStorage.setItem("adminVisited", "true");
      setTourRun(true);
    }
  }

  const tourSteps: Step[] = [
    {
      disableBeacon: true,
      target: ".poll-info",
      content:
        "Share the poll link with invitees to let them mark their availability.",
    },
    {
      target: "#poll-vote-table",
      content:
        "When the invitees have finished voting, come back to this page. If you happen to close this page, don't worry; you can also get here by visiting the link you shared with the invitees (this browser would remember that you're the poll creator). But if you need to mark the final time from another browser or device, make sure to save the poll's admin URL (this tab's URL).",
    },
    {
      target: "#poll-vote-table",
      content:
        "See who's free with 'yes' votes (green) - or who can be - with 'if need be' votes (yellow inside circle).",
    },
    {
      target: ".mark-options-btn",
      content: "Click here to mark the final time!",
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
        showProgress
        continuous
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
                className={
                  choice.start === pollFromDB.finalChoice?.start &&
                  choice.end === pollFromDB.finalChoice?.end
                    ? "slot-time slot-final-choice"
                    : "slot-time"
                }
              >
                <PollDateTime choice={choice} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pollFromDB.open && (
            <MarkFinalChoice
              choices={sortedChoices}
              setFinalChoice={setFinalChoice}
            />
          )}
          <tr>
            <td className="poll-table-total-participants">
              {pollFromDB.votes?.length} PARTICIPANTS
            </td>
            {sortedChoices.map((choice: Choice) => (
              <td key={choice.start} className="slot-total-votes">
                <span className="total-yes-votes">
                  <Check2 className="slot-check" />
                  {
                    pollFromDB.votes?.filter((vote: Vote) =>
                      isChoicePresentInPollChoices(
                        choice,
                        vote.choices.filter(
                          (choiceFromVote: Choice) => !choiceFromVote.ifNeedBe
                        )
                      )
                    ).length
                  }
                </span>
                <span className="total-if-need-be-votes">
                  <Check2Circle className="slot-check" />
                  {
                    pollFromDB.votes?.filter((vote: Vote) =>
                      isChoicePresentInPollChoices(
                        choice,
                        vote.choices.filter(
                          (choiceFromVote: Choice) => choiceFromVote.ifNeedBe
                        )
                      )
                    ).length
                  }
                </span>
              </td>
            ))}
          </tr>
          {pollFromDB.votes?.map((vote: Vote, idx: number) => (
            <tr key={`${idx}-${vote.name}`}>
              <td className="poll-table-participants">{vote.name}</td>
              {sortedChoices.map((choice: Choice) => (
                <td
                  key={choice.start}
                  className={slotCheckClassName(choice, vote.choices)}
                >
                  {isChoiceIfNeedBe(choice, vote.choices) ? (
                    <Check2Circle className="slot-check" />
                  ) : (
                    <Check2 className="slot-check" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PollTableAdmin;
