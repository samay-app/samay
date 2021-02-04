import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { RocketMeetPollFromDB } from "../../models/poll";

dayjs.extend(localizedFormat);

const ComingUp: Function = (props: {
  pollList: RocketMeetPollFromDB[];
}): JSX.Element[] | JSX.Element => {
  const { pollList } = props;
  const currentDate = Date.now();
  if (
    pollList.some(
      (item: RocketMeetPollFromDB) =>
        !item.open && (item.finalChoice?.start || 0) > currentDate
    )
  ) {
    return pollList.reverse().map((item: RocketMeetPollFromDB) => (
      <div key={item.createdAt}>
        {!item.open && (item.finalChoice?.start || 0) > currentDate ? (
          <div className="d-block m-1 p-2 upcomings">
            <b>{item.title}</b> on{" "}
            {dayjs(item.finalChoice?.start).format("ddd")},{" "}
            {dayjs(item.finalChoice?.start).format("MMM")}{" "}
            {dayjs(item.finalChoice?.start).format("DD")},{" "}
            {dayjs(item.finalChoice?.start).format("LT")}
          </div>
        ) : (
          <></>
        )}
      </div>
    ));
  }
  return <div>No upcoming events</div>;
};

export default ComingUp;
