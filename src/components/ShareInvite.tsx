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
import ResponseMessage from "./ResponseMessage";
import { MailerPollArgs } from "../models/poll";
import { RootState } from "../store/store";
import { mailerAPI } from "../api/mailer";

const ShareInvite = (props: {
  pollid: string;
  polltitle: string;
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

  const [response, setResponse] = useState({
    status: false,
    type: "null",
    msg: "",
  });

  const handleCopy = (): void => {
    copy(pollurl);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>Copied!</Popover.Content>
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
    if ([","].includes(evt.key)) {
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

  const handleSubmit = async (): Promise<void> => {
    const mailerArgs: MailerPollArgs = {
      pollID: pollid,
      pollTitle: polltitle,
      receiverIDs: emailList,
      senderName: displayName,
      senderEmailID: loggedInUserEmailID,
    };
    const sendEmailsResponse = await mailerAPI.sendPollInvites(
      mailerArgs,
      token
    );
    if (sendEmailsResponse.statusCode === 200) {
      setResponse({
        status: true,
        type: "success",
        msg: "Emails successfully sent.",
      });
    } else {
      setResponse({
        status: true,
        type: "error",
        msg: "Unable to send emails. Please try again later.",
      });
    }
  };

  return (
    <div className="poll-shareinvite-content">
      <Form
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
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
              <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <Button variant="light" onClick={handleCopy}>
                  Copy
                </Button>
              </OverlayTrigger>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label className="font-weight-bold">
            Invite participants
          </Form.Label>
          <Form.Control
            multiple
            type="email"
            className="invite-textbox"
            placeholder="Enter comma-separated emails"
            value={currentEmail}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onPaste={handlePaste}
          />
          <div className="emailList">
            {emailList.map((email) => (
              <div className="tag-item" key={email}>
                {email}
                <button
                  type="button"
                  className="button"
                  onClick={(): void => handleDelete(email)}
                >
                  &times;
                </button>
              </div>
            ))}
            {error && <p className="error">{error}</p>}
          </div>
          <Button
            className="my-2"
            variant="light"
            onClick={handleSubmit}
            disabled={emailList.length < 1}
          >
            Invite
          </Button>
        </Form.Group>
      </Form>
      <ResponseMessage
        response={response}
        onHide={(): void =>
          setResponse({ status: false, type: "null", msg: "" })
        }
      />
    </div>
  );
};
export default ShareInvite;
