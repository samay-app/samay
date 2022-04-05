import { Toast } from "react-bootstrap";
import { Dispatch } from "react";

const ResponseMessage = (props: {
  response: { status: boolean; msg: string };
  setResponse: Dispatch<{ status: boolean; msg: string }>;
}): JSX.Element => {
  const { response, setResponse } = props;

  return (
    <Toast
      onClose={(): void => setResponse({ status: false, msg: "" })}
      show={response.status}
      delay={3000}
      autohide
      className="global-toast"
    >
      <Toast.Body>{response.msg}</Toast.Body>
    </Toast>
  );
};

export default ResponseMessage;
