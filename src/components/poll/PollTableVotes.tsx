import { Table } from "react-bootstrap";
import { CheckCircleFill, CircleFill } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import PollDateTime from "./PollDateTime";
import { Time, PollFromDB, Vote } from "../../models/poll";
import { slotCheckClassName, isTimeIfNeedBe } from "../../helpers";

dayjs.extend(localizedFormat);

const PollTableVotes = (props: {
  pollFromDB: PollFromDB;
  sortedTimes: Time[];
}): JSX.Element => {
  const { pollFromDB, sortedTimes } = props;
  return (
    <div className="poll-info-div">
      <Table responsive className="poll-table">
        <thead>
          <tr className="poll-table-top-row">
            <th className="participant-cell"> </th>
            {sortedTimes.map((time) => (
              <th
                key={time.start}
                className={
                  time.start === pollFromDB.finalTime?.start &&
                    time.end === pollFromDB.finalTime?.end
                    ? "slot-time slot-final-time"
                    : "slot-time"
                }
              >
                <PollDateTime time={time} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pollFromDB.votes?.map((vote: Vote, idx: number) => (
            <tr key={`${idx}-${vote.name}`}>
              <td className="poll-table-participants">{vote.name}</td>
              {sortedTimes.map((time: Time) => (
                <td
                  key={time.start}
                  className={slotCheckClassName(time, vote.times)}
                >
                  {isTimeIfNeedBe(time, vote.times) ? (
                    <CircleFill className="slot-check" />
                  ) : (
                    <CheckCircleFill className="slot-check" />
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

export default PollTableVotes;
