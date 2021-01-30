import {
  Form,
  InputGroup,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import copy from "copy-to-clipboard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MailerPollArgs } from "../models/poll";
import { RootState } from "../store/store";
import { mailerAPI } from "../api/mailer";

const Invitation = (props: {
  pollid: string;
  polltitle: string;
  onChangeS(arg: boolean): void;
  onChangeF(arg: boolean): void;
}): JSX.Element => {
  const { pollid } = props;
  const { polltitle } = props;
  const pollurl = `${mailerAPI.domain}/poll/${pollid}`; /* This should be replaced */
  const displayName = useSelector(
    (state: RootState) => state.authReducer.displayName
  );
  const loggedInUserEmailID = useSelector(
    (state: RootState) => state.authReducer.username
  );
  const token = useSelector((state: RootState) => state.authReducer.token);
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
  const isInList = (email: string): boolean => {
    return emailList.includes(email);
  };
  const isEmail = (email: string): boolean => {
    return /[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/.test(email);
  };
  const isValid = (email: string): boolean => {
    let mailerror = null;
    if (isInList(email)) {
      mailerror = `${email} has already been added.`;
    }
    if (!isEmail(email)) {
      mailerror = `${email} is not a valid email address.`;
    }
    if (mailerror) {
      setError(mailerror);
      return false;
    }
    return true;
  };
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    if (["Enter", "Tab", " ", ","].includes(evt.key)) {
      evt.preventDefault();
      let value = currentEmail.trim();
      if (value && isValid(value)) {
        setEmails([...emailList, value]);
        setCurrentEmail("");
      }
    }
  };
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentEmail(evt.target.value);
    setError("");
  };
  /* added void and removed email:any to email:string ( remove this comment at last PR) */
  const handleDelete = (email: string): void => {
    setEmails(emailList.filter((i) => i !== email));
  };
  const handlePaste = (evt: React.ClipboardEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    let paste = evt.clipboardData.getData("text");
    let emails = paste.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g);
    if (emails) {
      let toBeAdded = emails.filter((email) => !isInList(email));
      setEmails([...emailList, ...toBeAdded]);
    }
  };
  const handlePreSubmit = (): void => {
    let value = currentEmail.trim();
    if (value && isValid(value)) {
      setEmails([...emailList, value]);
      setCurrentEmail("");
    }
    handleSubmit();
  }
  /* added void below( remove this comment at last PR) */
  const handleSubmit = async (): Promise<void> => {
    /* console.log(emailList); which is also to be removed */
    const mailerArgs: MailerPollArgs = {
      pollID: pollid,
      pollTitle: polltitle,
      receiverIDs: emailList,
      senderName: displayName,
      senderEmailID: loggedInUserEmailID,
    };
    const { statusCode } = await mailerAPI.sendPollInvites(mailerArgs, token);
    if (statusCode === 200) {
      props.onChangeS(true);
    } else {
      props.onChangeF(true);
    }
  };

  return (
    <div
      className="d-flex flex-column p-4 m-1 mt-4 border"
      id="share"
      style={{ width: "90%", maxWidth: "500px" }}
    >
      <Form
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <Form.Group controlId="formBasicEmail" className="text-center">
          <Form.Label className="font-weight-bold">
            Invite participants by email
            <div className="emailList">
              {emailList.map((email) => (
                <div className="tag-item" key={email}>
                  {email}
                  <button
                    type="button"
                    className="button"
                    onClick={(): void =>
                      handleDelete(email)
                    } /* added void ( remove this comment at last PR) */
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </Form.Label>
          <Form.Control
            multiple
            type="email"
            placeholder="Enter emails"
            value={currentEmail}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onPaste={handlePaste}
          />
          <Button className="my-2" variant="light" onClick={handlePreSubmit}>
            Invite
          </Button>
        </Form.Group>
        {error && <p className="error">{error}</p>}

        <Form.Group className="text-center">
          <Form.Label className="font-weight-bold">Share Link</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control type="text" readOnly defaultValue={pollurl} />
            <InputGroup.Append>
              <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <Button variant="light" onClick={handleCopy}>
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
