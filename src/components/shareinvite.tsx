import {
  Form,
  InputGroup,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import copy from "copy-to-clipboard";
import { useState } from "react";

const Invitation = (props: { pollid: string }): JSX.Element => {
  const { pollid } = props;
  const pollurl = `http://localhost:3000/poll/${pollid}`; /* This should be replaced */
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [emailList, setEmails] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const handleCopy = (): void => {
    copy(pollurl);
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>Copied</Popover.Content>
    </Popover>
  );
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      var value = currentEmail.trim();
      if (value && isValid(value)) {
        setEmails([...emailList, currentEmail])
        setCurrentEmail("")
      }
    }
  };
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentEmail(evt.target.value)
    setError("")
  };
  const handleDelete = (email: any) => {
    setEmails(emailList.filter(i => i !== email))
  };
  const handlePaste = (evt: React.ClipboardEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);
    if (emails) {
      var toBeAdded = emails.filter(email => !isInList(email));
      setEmails([...emailList, ...toBeAdded]);
    }
  };

  const isValid = (email: string): Boolean => {
    let error = null;
    if (isInList(email)) {
      error = `${email} has already been added.`;
    }
    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }
    if (error) {
      setError(error);
      return false;
    }
    return true;
  }
  const isInList = (email: string): Boolean => {
    return emailList.includes(email);
  }
  const isEmail = (email: string): Boolean => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }
  const handleSubmit = () => {

  }

  return (
    <div
      className="d-flex flex-column p-4 m-1 border"
      id="share"
      style={{ width: "90%", maxWidth: "500px" }}
    >
      <Form onSubmit={(e): void => {
        e.preventDefault();
      }}>
        <Form.Group controlId="formBasicEmail" className="text-center">
          <Form.Label className="font-weight-bold">
            Invite participants by email
            <div className="emailList">
              {emailList.map(email => (
                <div className="tag-item" key={email}>
                  {email}
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleDelete(email)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </Form.Label>
          <Form.Control
            multiple type="email"
            placeholder="Enter emails"
            value={currentEmail}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onPaste={handlePaste}
          />
          <Button className="my-2">Invite</Button>
        </Form.Group>
        {error && <p className="error">{error}</p>}

        <Form.Group className="text-center">
          <Form.Label className="font-weight-bold">Share Link</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control type="text" readOnly defaultValue={pollurl} />
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
