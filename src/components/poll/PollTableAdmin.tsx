import { Dispatch } from "react";
import { Table } from "react-bootstrap";
import { Check2, Check2Circle } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import MarkFinalTime from "./MarkFinalTime";
import PollDateTime from "./PollDateTime";
import { Time, PollFromDB, Vote } from "../../models/poll";
import {
  isTimePresentInPollTimes,
  slotCheckClassName,
  isTimeIfNeedBe,
} from "../../helpers";

dayjs.extend(localizedFormat);

const PollTableAdmin = (props: {
  pollFromDB: PollFromDB;
  sortedTimes: Time[];
  setFinalTime: Dispatch<Time | undefined>;
}): JSX.Element => {
  const { pollFromDB, sortedTimes, setFinalTime } = props;

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th className="poll-participant-cell"> </th>
            {sortedTimes.map((time) => (
              <th
                key={time.start}
                className={
                  time.start === pollFromDB.finalTime?.start &&
                  time.end === pollFromDB.finalTime?.end
                    ? "poll-slot-time poll-slot-final-time"
                    : "poll-slot-time"
                }
              >
                <PollDateTime time={time} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pollFromDB.open && (
            <MarkFinalTime times={sortedTimes} setFinalTime={setFinalTime} />
          )}
          <tr>
            <td className="poll-table-total-participants">
              {pollFromDB.votes?.length} PARTICIPANTS
            </td>
            {sortedTimes.map((time: Time) => (
              <td key={time.start} className="poll-slot-total-votes">
                <span className="poll-total-yes-votes">
                  <Check2 className="poll-slot-check" />
                  {
                    pollFromDB.votes?.filter((vote: Vote) =>
                      isTimePresentInPollTimes(
                        time,
                        vote.times.filter(
                          (timeFromVote: Time) => !timeFromVote.ifNeedBe
                        )
                      )
                    ).length
                  }
                </span>
                <span className="poll-total-if-need-be-votes">
                  <Check2Circle className="poll-slot-check" />
                  {
                    pollFromDB.votes?.filter((vote: Vote) =>
                      isTimePresentInPollTimes(
                        time,
                        vote.times.filter(
                          (timeFromVote: Time) => timeFromVote.ifNeedBe
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
              {sortedTimes.map((time: Time) => (
                <td
                  key={time.start}
                  className={slotCheckClassName(time, vote.times)}
                >
                  {isTimeIfNeedBe(time, vote.times) ? (
                    <Check2Circle className="poll-slot-check" />
                  ) : (
                    <Check2 className="poll-slot-check" />
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
