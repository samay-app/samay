import {
  Form,
  InputGroup,
  FormControl,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import copy from "copy-to-clipboard";

const Invitation = (): JSX.Element => {
  const val = "http://xyz.xz";
  {
    /*This should be replaced */
  }

  function handleCopy() {
    copy(val);
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>Copied</Popover.Content>
    </Popover>
  );
  return (
    <div
      className="d-flex flex-column p-4 m-1 border"
      id="share"
      style={{ width: "90%", maxWidth: "500px" }}
    >
      <Form>
        <Form.Group controlId="formBasicEmail" className="text-center">
          <Form.Label className="font-weight-bold">
            Invite participants by email
          </Form.Label>
          <Form.Control multiple type="email" placeholder="Enter emails" />
          <Button className="my-2">Invite</Button>
        </Form.Group>

        <Form.Group className="text-center">
          <Form.Label className="font-weight-bold">Share Link</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control type="text" readOnly defaultValue={val} />
            <InputGroup.Append>
              <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <Button variant="outline-secondary" onClick={handleCopy}>
                  copy
                </Button>
              </OverlayTrigger>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};
export default Invitation;
