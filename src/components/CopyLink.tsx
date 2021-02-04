import {
  Form,
  InputGroup,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { Clipboard } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import copy from "copy-to-clipboard";
import { Choice } from "../models/poll";

dayjs.extend(localizedFormat);

const CopyLink = (props: {
  pollURL: string;
  pollTitle: string;
  finalChoice: Choice | undefined;
}): JSX.Element => {
  const { pollURL, pollTitle, finalChoice } = props;

  let textToCopy: string;

  if (finalChoice) {
    textToCopy = `${pollTitle} would be held on ${dayjs(
      finalChoice?.start
    ).format("ddd")}, ${dayjs(finalChoice?.start).format("MMM")} ${dayjs(
      finalChoice?.start
    ).format("DD")}, ${dayjs(finalChoice?.start).format("LT")} - ${dayjs(
      finalChoice?.end
    ).format("LT")}.`;
  } else {
    textToCopy = pollURL;
  }

  const handleCopy = (): void => {
    copy(textToCopy);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>Copied!</Popover.Content>
    </Popover>
  );

  return (
    <div>
      <Form.Group>
        <Form.Label className="font-weight-bold share-label">
          {finalChoice ? "Copy final time" : "Share link"}
        </Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            readOnly
            defaultValue={textToCopy}
            className="share-textbox"
          />
          <InputGroup.Append>
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
              <Button variant="light" onClick={handleCopy} className="copy-btn">
                <Clipboard />
              </Button>
            </OverlayTrigger>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </div>
  );
};

export default CopyLink;
