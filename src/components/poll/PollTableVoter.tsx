import { Dispatch } from "react";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MarkTimes from "./MarkTimes";
import PollDateTime from "./PollDateTime";
import { TimeFromDB, Vote } from "../../models/poll";

dayjs.extend(localizedFormat);

const PollTableVoter = (props: {
  loggedInUsername: string;
  sortedTimes: TimeFromDB[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { loggedInUsername, sortedTimes, newVote, setNewVote } = props;

  return (
    <div className="poll-info-div" id="poll-vote-table">
      <Table responsive className="poll-table">
        <thead>
          <tr className="poll-table-top-row">
            <th className="participant-cell"> </th>
            {sortedTimes.map((time) => (
              <th key={time.start} className="slot-time">
                <PollDateTime time={time} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <MarkTimes
            username={loggedInUsername}
            times={sortedTimes}
            newVote={newVote}
            setNewVote={setNewVote}
          />
        </tbody>
      </Table>
    </div>
  );
};

export default PollTableVoter;
