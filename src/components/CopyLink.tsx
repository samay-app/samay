import {
  Form,
  InputGroup,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import copy from "copy-to-clipboard";

const CopyLink = (props: { pollurl: string; final: boolean }): JSX.Element => {
  const { pollurl, final } = props;
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
      <Form.Group>
        <Form.Label className="font-weight-bold">
          {final ? "Copy final time info" : "Share link"}
        </Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            readOnly
            defaultValue={pollurl}
            className="share-textbox"
          />
          <InputGroup.Append>
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
              <Button variant="light" onClick={handleCopy}>
                Copy
              </Button>
            </OverlayTrigger>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </div>
  );
};

export default CopyLink;
