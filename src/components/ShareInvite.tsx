import {
  Form,
  InputGroup,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import copy from "copy-to-clipboard";
import { mailerAPI } from "../api/mailer";
import InviteMail from "./InviteMail";

const ShareInvite = (props: {
  pollid: string;
  polltitle: string;
}): JSX.Element => {
  const { pollid } = props;
  const { polltitle } = props;
  const pollurl = `${mailerAPI.domain}/poll/${pollid}`; /* This should be replaced */

  const handleCopy = (): void => {
    copy(pollurl);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>Copied!</Popover.Content>
    </Popover>
  );

  return (
    <div>
      <Form
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <div className="poll-shareinvite-content">
          <Form.Group>
            <Form.Label className="font-weight-bold">Share link</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                readOnly
                defaultValue={pollurl}
                className="share-textbox"
              />
              <InputGroup.Append>
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  overlay={popover}
                >
                  <Button variant="light" onClick={handleCopy}>
                    Copy
                  </Button>
                </OverlayTrigger>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </div>
        <InviteMail
          pollid={pollid}
          polltitle={polltitle}
          finalChoice={undefined}
        />
      </Form>
    </div>
  );
};
export default ShareInvite;
