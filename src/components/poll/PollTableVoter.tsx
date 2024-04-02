import { Dispatch } from "react";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MarkTimes from "./MarkTimes";
import MarkTimesOneOnOne from "./MarkTimesOneOnOne";
import PollDateTime from "./PollDateTime";
import { Time, PollFromDB, Vote } from "../../models/poll";
import { isTimePresentInPollTimes } from "../../helpers";

dayjs.extend(localizedFormat);

const PollTableVoter = (props: {
  pollFromDB: PollFromDB;
  sortedTimes: Time[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { pollFromDB, sortedTimes, newVote, setNewVote } = props;

  let availableTimes = [];
  let votedTimes = pollFromDB.votes.map((vote) => vote.times[0]);

  pollFromDB.times.map((time) => {
    if (!isTimePresentInPollTimes(time, votedTimes)) {
      availableTimes.push(time);
    }
  });

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            {(!pollFromDB.type || pollFromDB.type === "group") &&
              sortedTimes.map((time) => (
                <th key={time.start} className="poll-slot-time">
                  <PollDateTime time={time} type="voter" />
                </th>
              ))}
            {pollFromDB.type === "oneonone" &&
              availableTimes.map((time) => (
                <th key={time.start} className="poll-slot-time">
                  <PollDateTime time={time} type="voter" />
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {pollFromDB.open &&
            (!pollFromDB.type || pollFromDB.type === "group") && (
              <MarkTimes
                times={sortedTimes}
                newVote={newVote}
                poll={pollFromDB}
                setNewVote={setNewVote}
              />
            )}
          {pollFromDB.open && pollFromDB.type === "oneonone" && (
            <MarkTimesOneOnOne
              times={sortedTimes}
              newVote={newVote}
              poll={pollFromDB}
              setNewVote={setNewVote}
            />
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PollTableVoter;
