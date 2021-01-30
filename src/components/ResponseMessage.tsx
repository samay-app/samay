import { Modal } from "react-bootstrap";

const ResponseMessage = (props: {
  response: { status: boolean; type: string; msg: string };
  onHide(arg: boolean): void;
}): JSX.Element => {
  const { response, onHide } = props;
  let responseClassName: string;

  if (response.type === "error") {
    responseClassName = "rm-response-error";
  } else if (response.type === "success") {
    responseClassName = "rm-response-success";
  } else {
    responseClassName = "rm-response-null";
  }

  return (
    <Modal
      show={response.status}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={responseClassName}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="rm-response-title"
        >
          {response.msg}
        </Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default ResponseMessage;
