import {
  Form,
  InputGroup,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { Files } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import copy from "copy-to-clipboard";
import { useState } from "react";
import { Time } from "../../models/poll";

dayjs.extend(localizedFormat);

const CopyTextMain = (props: {
  pollURL: string;
  pollTitle: string;
  finalTime: Time | undefined;
}): JSX.Element => {
  const { pollURL, pollTitle, finalTime } = props;

  let textToCopy: string;

  if (finalTime) {
    textToCopy = `"${pollTitle}": ${dayjs(finalTime?.start).format(
      "ddd"
    )}, ${dayjs(finalTime?.start).format("MMM")} ${dayjs(
      finalTime?.start
    ).format("DD")}, ${dayjs(finalTime?.start).format("LT")} - ${dayjs(
      finalTime?.end
    ).format("LT")}`;
  } else {
    textToCopy = pollURL;
  }
  const [show, setShow] = useState(false);
  const handleCopy = (): void => {
    setShow(true);
    copy(textToCopy);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>Copied!</Popover.Content>
    </Popover>
  );

  return (
    <div>
      <Form.Group>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            readOnly
            defaultValue={textToCopy}
            className="poll-share-textbox"
          />
          <InputGroup.Append>
            <OverlayTrigger
              trigger="click"
              placement="top"
              show={show}
              overlay={popover}
            >
              <Button
                variant="light"
                onClick={handleCopy}
                className="poll-copy-btn"
              >
                <Files />
              </Button>
            </OverlayTrigger>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </div>
  );
};

export default CopyTextMain;
