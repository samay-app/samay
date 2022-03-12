import { Form } from "react-bootstrap";
import { Choice } from "../../models/poll";
import CopyLink from "./CopyLink";

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const ShareInvite = (props: {
  pollID: string;
  pollTitle: string;
  finalChoice: Choice | undefined;
}): JSX.Element => {
  const { pollID, pollTitle, finalChoice } = props;
  const pollURL = `${NEXT_PUBLIC_BASE_URL}/poll/${pollID}`;

  return (
    <div className="poll-shareinvite-content">
      <Form
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <CopyLink
          pollURL={pollURL}
          pollTitle={pollTitle}
          finalChoice={finalChoice}
        />
      </Form>
    </div>
  );
};
export default ShareInvite;
