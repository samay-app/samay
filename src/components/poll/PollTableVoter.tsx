import { Dispatch } from "react";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MarkTimes from "./MarkTimes";
import PollDateTimeWithCheck from "./PollDateTimeWithCheck";
import { Time, PollFromDB, Vote } from "../../models/poll";
import { slotTimeClassName } from "../../helpers";

dayjs.extend(localizedFormat);

const PollTableVoter = (props: {
  pollFromDB: PollFromDB;
  loggedInUsername: string;
  sortedTimes: Time[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const {
    pollFromDB,
    loggedInUsername,
    sortedTimes,
    newVote,
    setNewVote,
  } = props;

  return (
    <div className="poll-info-div" id="poll-vote-table">
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
