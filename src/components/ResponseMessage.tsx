import { Modal } from "react-bootstrap";

const ResponseMessage = (props: {
  response: { status: boolean; type: string; msg: string };
  onHide(arg: boolean): void;
}): JSX.Element => {
  const { response, onHide } = props;
  return (
    <Modal
      show={response.status}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className={
          response.type === "error"
            ? "rm-response-error"
            : "rm-response-success"
        }
      >
        <Modal.Title id="contained-modal-title-vcenter">
          {response.msg}
        </Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default ResponseMessage;
