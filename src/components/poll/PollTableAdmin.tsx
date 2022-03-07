import { Dispatch } from "react";
import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Check, PatchCheckFill } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MarkChoices from "./MarkChoices";
import MarkFinalChoice from "./MarkFinalChoice";
import PollDateTime from "./PollDateTime";
import { Choice, PollFromDB, Vote } from "../../models/poll";
import { isChoicePresentInPollChoices } from "../../helpers";

dayjs.extend(localizedFormat);

const PollTable = (props: {
  pollFromDB: PollFromDB;
  sortedChoices: Choice[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
  setFinalChoice: Dispatch<Choice | undefined>;
  pollCreatorEmailID: string;
  loggedInUserEmailID: string;
}): JSX.Element => {
  const {
    pollFromDB,
    sortedChoices,
    newVote,
    setNewVote,
    setFinalChoice,
    pollCreatorEmailID,
    loggedInUserEmailID,
  } = props;
  return (
    <div className="poll-info-div">
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
                {choice.start === pollFromDB.finalChoice?.start &&
                  choice.end === pollFromDB.finalChoice?.end && (
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip id="finalTime1">Final time</Tooltip>}
                    >
                      <PatchCheckFill className="final-star" />
                    </OverlayTrigger>
                  )}
                <PollDateTime choice={choice} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pollFromDB.open && loggedInUserEmailID !== pollCreatorEmailID && (
            <MarkChoices
              choices={sortedChoices}
              newVote={newVote}
              setNewVote={setNewVote}
            />
          )}
          {pollFromDB.open && loggedInUserEmailID === pollCreatorEmailID && (
            <MarkFinalChoice
              choices={sortedChoices}
              setFinalChoice={setFinalChoice}
            />
          )}
          {pollFromDB.votes?.map((vote: Vote, idx: number) => (
            <tr key={`${idx}-${vote.name}`}>
              <td className="poll-table-participants">{vote.name}</td>
              {sortedChoices.map((choice) => (
                <td
                  key={choice.start}
                  className={
                    isChoicePresentInPollChoices(choice, vote.choices)
                      ? "slot-checked"
                      : "slot-unchecked"
                  }
                >
                  {isChoicePresentInPollChoices(choice, vote.choices) ? (
                    <Check className="checked-option" />
                  ) : (
                    ""
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

export default PollTable;
