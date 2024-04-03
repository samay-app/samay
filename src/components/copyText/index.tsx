import { Form } from "react-bootstrap";
import { PollFromDB } from "../../models/poll";
import CopyTextMain from "./CopyTextMain";

const CopyText = (props: { poll: PollFromDB }): JSX.Element => {
  const { poll } = props;

  return (
    <div className="poll-shareinvite-content">
      <Form
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <CopyTextMain poll={poll} />
      </Form>
    </div>
  );
};
export default CopyText;
