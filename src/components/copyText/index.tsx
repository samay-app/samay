import { Form } from "react-bootstrap";
import { Time } from "../../models/poll";
import CopyTextMain from "./CopyTextMain";

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const CopyText = (props: {
  pollID: string;
  pollTitle: string;
  finalTime: Time | undefined;
}): JSX.Element => {
  const { pollID, pollTitle, finalTime } = props;
  const pollURL = `${NEXT_PUBLIC_BASE_URL}/poll/${pollID}`;

  return (
    <div className="poll-shareinvite-content">
      <Form
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <CopyTextMain
          pollURL={pollURL}
          pollTitle={pollTitle}
          finalTime={finalTime}
        />
      </Form>
    </div>
  );
};
export default CopyText;
