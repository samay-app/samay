import { Form } from "react-bootstrap";
import { Choice } from "../../models/poll";
import CopyLink from "./CopyLink";

const ShareInvite = (props: {
  pollID: string;
  pollTitle: string;
  finalChoice: Choice | undefined;
}): JSX.Element => {
  const { pollID, pollTitle, finalChoice } = props;
  const pollURL = `${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}/poll/${pollID}`; /* This should be replaced */

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
