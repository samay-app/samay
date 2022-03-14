import { Check2, Check2Circle } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Choice } from "../../models/poll";
import { isChoicePresentInPollChoices, isChoiceIfNeedBe } from "../../helpers";

dayjs.extend(localizedFormat);

const PollDateTime = (props: {
  choice: Choice;
  voteChoices: Choice[];
}): JSX.Element => {
  const { choice, voteChoices } = props;

  let checkMark = <></>;

  if (isChoicePresentInPollChoices(choice, voteChoices)) {
    if (isChoiceIfNeedBe(choice, voteChoices))
      checkMark = <Check2Circle className="slot-check-date-time-if-need-be" />;
    else checkMark = <Check2 className="slot-check-date-time-yes" />;
  }
  return (
    <div className="datetime-div">
      <span className="datetime-weekday">
        {dayjs(choice.start).format("ddd")}
      </span>
      {checkMark}
      <span className="datetime-day">{dayjs(choice.start).format("D")}</span>
      <span className="datetime-mon">{dayjs(choice.start).format("MMM")}</span>
      <span className="datetime-time-1">
        {dayjs(choice.start).format("LT")}
      </span>
      <span className="datetime-time-2">{dayjs(choice.end).format("LT")}</span>
    </div>
  );
};

export default PollDateTime;
