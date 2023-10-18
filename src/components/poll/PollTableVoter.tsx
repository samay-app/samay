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
  let VotedTimes = pollFromDB.votes.map((vote)=> vote.times[0]);

  pollFromDB.times.map((time) => {
    if (!isTimePresentInPollTimes(time, VotedTimes)) {
        availableTimes.push(time)
    }
  }
  );

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            {pollFromDB.type === "Group-poll" && (sortedTimes.map((time) => (
              <th key={time.start} className="poll-slot-time">
                <PollDateTime time={time} type="voter" />
              </th>
            )))}
            {pollFromDB.type === "One-on-one" && (availableTimes.map((time) => (
              <th key={time.start} className="poll-slot-time">
                <PollDateTime time={time} />
              </th>
            )))}
          </tr>
        </thead>
        <tbody>
          {pollFromDB.open && pollFromDB.type === "Group-poll" && (
            <MarkTimes
              times={sortedTimes}
              newVote={newVote}
              poll={pollFromDB}
              setNewVote={setNewVote}
            />
          )}
          {pollFromDB.open && pollFromDB.type === "One-on-one" && (
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
