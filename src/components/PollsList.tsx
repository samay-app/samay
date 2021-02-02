import { useEffect, useState, useCallback } from "react";
import NProgress from "nprogress";
import { Trash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import {
  Card,
  Badge,
  Row,
  Col,
  CardColumns,
  Button,
  Modal,
} from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { serverAPI } from "../api/server";
import { encrypt } from "../helpers/helpers";
import { RocketMeetPollFromDB } from "../models/poll";
import { RootState } from "../store/store";
import ResponseMessage from "./ResponseMessage";

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
  const [id, setId] = useState<string>("");

  const getData = useCallback(async (): Promise<void> => {
    try {
      NProgress.start();
      const fetchedPolls = await serverAPI.getPolls({
        encryptedEmailID,
        token,
      });
      NProgress.done();
      if (fetchedPolls.statusCode === 200) {
        setPollList(fetchedPolls.data);
        setMessage(
          "You haven't created any polls yet. Create one by clicking the button above!"
        );
      } else {
        setPollList([]);
        setMessage("Unable to fetch polls. Please try again later.");
      }
    } catch (err) {
      setMessage("Unable to fetch polls. Check your connection.");
      NProgress.done();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleDelete = async (pollID: string): Promise<void> => {
    try {
      const voteArgs = {
        pollID,
        token,
      };
      const deletedStatus = await serverAPI.deletePoll(voteArgs);
      if (deletedStatus.statusCode === 200) {
        getData();
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

  const Polls: Function = (): JSX.Element[] => {
    return pollList.reverse().map((item: RocketMeetPollFromDB) => (
      <div key={item._id}>
        <Row>
          <Col className="col-11">
            <Card bg="dark" text="white" className="pt-4 px-4 my-2 cardindash">
              <Row>
                <div className="col-8">
                  <Card.Title className="d-flex flex-row justify-content-between">
                    <span className="card-title">{item.title}</span>
                  </Card.Title>
                </div>
                <div className="col-4">
                  <Badge
                    pill
                    variant={item.open ? "success" : "secondary"}
                    className="rm-badge-dash"
                  >
                    {item.open ? "open" : "closed"}
                  </Badge>
                </div>
              </Row>
              <Card.Body className="text-justify">
                <a
                  href={`/poll/${item._id}`}
                  aria-label="stretched link"
                  className="stretched-link card-bdy "
                >
                  {item.description}
                </a>
              </Card.Body>
              <Card.Footer className="px-0">
                <span className="text-muted">
                  Created : {dayjs(item.createdAt).format("DD/MM/YYYY")}
                </span>
              </Card.Footer>
            </Card>
          </Col>
          <Col className="col-1 p-0">
            <Button
              variant="outline-light"
              className="my-2 rm-delete-button"
              onClick={(): void => {
                setId(item._id);
                setModalShow(true);
              }}
            >
              <Trash size="22" color="red " />
            </Button>
          </Col>
        </Row>
      </div>
    ));
  };

  const currentDate = Date.now();

  const Recents: Function = (): JSX.Element[] | JSX.Element => {
    if (
      pollList.some(
        (item: RocketMeetPollFromDB) =>
          !item.open && (item.finalChoice?.start || 0) > currentDate
      )
    ) {
      return pollList.reverse().map((item: RocketMeetPollFromDB) => (
        <div key={item.createdAt}>
          {!item.open && (item.finalChoice?.start || 0) > currentDate ? (
            <div className="d-block m-1 p-2 upcomings">
              <b>{item.title}</b> on{" "}
              {dayjs(item.finalChoice?.start).format("ddd")},{" "}
              {dayjs(item.finalChoice?.start).format("MMM")}{" "}
              {dayjs(item.finalChoice?.start).format("DD")},{" "}
              {dayjs(item.finalChoice?.start).format("LT")}
            </div>
          ) : (
            <></>
          )}
        </div>
      ));
    }
    return <div>No upcoming events</div>;
  };

  return (
    <>
      <Row className="inner-container">
        <Col className="col-xl-8 col-lg-8 col-md-12">
          <h3 className="dash-your-polls">Your Polls </h3>
          <ResponseMessage
            response={response}
            onHide={(): void =>
              setResponse({ status: false, type: "", msg: "" })
            }
          />
          <Modal
            centered
            show={modalShow}
            onHide={(): void => setModalShow(false)}
          >
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
                    handleDelete(id);
                  }}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </div>
          </Modal>

          <div className="mb-2 mt-3">
            {pollList && pollList.length > 0 ? (
              <CardColumns>
                <Polls />
              </CardColumns>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </Col>
        <Col className="col-xl-4 col-lg-4 recents">
          <h3 className="dash-coming-up">Coming up</h3>
          <div className="border-left recent-div">
            <Recents />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PollsList;
