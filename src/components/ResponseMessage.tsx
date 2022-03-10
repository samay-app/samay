import { Toast } from "react-bootstrap";
import { Dispatch } from "react";

const ResponseMessage = (props: {
  response: { status: boolean; type: string; msg: string };
  setResponse: Dispatch<{ status: boolean; type: string; msg: string }>;
}): JSX.Element => {
  const { response, setResponse } = props;

  return (
    <Toast
      onClose={(): void => setResponse({ status: false, type: "", msg: "" })}
      show={response.status}
      delay={3000}
      autohide
      className="custom-toast"
    >
      <Toast.Body>{response.msg}</Toast.Body>
    </Toast>
  );
};

export default ResponseMessage;
