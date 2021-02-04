import { useEffect, useState } from "react";
import NProgress from "nprogress";
import { useSelector } from "react-redux";
import { Row, Col, CardColumns, Button, Modal } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Router from "next/router";
import { getPolls, deletePoll } from "../../utils/api/server";
import { encrypt } from "../../helpers/helpers";
import { RocketMeetPollFromDB } from "../../models/poll";
import { RootState } from "../../store/store";
import ResponseMessage from "../ResponseMessage";
import ComingUp from "./ComingUp";
import Polls from "./Polls";

dayjs.extend(localizedFormat);

const PollsList = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.authReducer.username);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const encryptedEmailID = encrypt(user);
  const [pollList, setPollList] = useState<RocketMeetPollFromDB[]>([]);
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState({
    status: false,
    type: "",
    msg: "",
  });
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [pollIDToDelete, setPollIDToDelete] = useState<string>("");

  useEffect(() => {
    const fetchPolls = async (): Promise<void> => {
      try {
        NProgress.start();
        const fetchedPolls = await getPolls({
          encryptedEmailID,
          token,
        });
        NProgress.done();
        if (fetchedPolls.statusCode === 200) {
          setPollList(fetchedPolls.data);
          setMessage(
            "You haven't created any polls yet. Create one by clicking the button above!"
          );
        } else if (fetchedPolls.statusCode === 401) {
          setPollList([]);
          Router.reload();
        }
      } catch (err) {
        setMessage("Unable to fetch polls. Check your connection.");
        NProgress.done();
      }
    };

    fetchPolls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (pollID: string): Promise<void> => {
    try {
      const voteArgs = {
        pollID,
        token,
      };
      const deletedStatus = await deletePoll(voteArgs);
      if (deletedStatus.statusCode === 200) {
        Router.reload();
      } else {
        setResponse({
          status: true,
          type: "error",
          msg: "Poll deletion failed, please try again later.",
        });
      }
    } catch (err) {
      setResponse({
        status: true,
        type: "error",
        msg: "Poll deletion failed, please try again later.",
      });
    }
  };

  return (
    <>
      <Row className="inner-container">
        <Col className="col-xl-8 col-lg-8 col-md-12">
          <h3 className="dash-your-polls">Your Polls </h3>
          <div className="mb-2 mt-3">
            {pollList && pollList.length > 0 ? (
              <CardColumns>
                <Polls
                  pollList={pollList}
                  setPollIDToDelete={setPollIDToDelete}
                  setModalShow={setModalShow}
                />
              </CardColumns>
            ) : (
              <span>{message}</span>
            )}
          </div>
        </Col>
        <Col className="col-xl-4 col-lg-4 recents">
          <h3 className="dash-coming-up">Coming up</h3>
          <div className="border-left recent-div">
            <ComingUp pollList={pollList} />
          </div>
        </Col>
      </Row>

      <ResponseMessage
        response={response}
        onHide={(): void => setResponse({ status: false, type: "", msg: "" })}
      />
      <Modal centered show={modalShow} onHide={(): void => setModalShow(false)}>
        <div className="modal-dark modal-content">
          <Modal.Header>
            <h4>Confirm deletion</h4>
          </Modal.Header>
          <Modal.Body>Do you really want to delete this poll?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(): void => setModalShow(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={(): void => {
                setModalShow(false);
                handleDelete(pollIDToDelete);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default PollsList;
