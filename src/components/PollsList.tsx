import { useEffect, useState } from "react";
import NProgress from "nprogress";
import { useSelector } from "react-redux";
import { Card, Badge, Row, Col, CardColumns, Button } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { serverAPI } from "../api/server";
import { encrypt } from "../helpers/helpers";
import { RocketMeetPollFromDB } from "../models/poll";
import { RootState } from "../store/store";

dayjs.extend(localizedFormat);

const PollsList = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.authReducer.username);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const userID = encrypt(user);
  const [pollList, setPollList] = useState<RocketMeetPollFromDB[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        NProgress.start();
        const fetchedPolls = await serverAPI.getPolls({
          userID,
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
        setMessage("Unable to fetch polls. Please try again later.");
        NProgress.done();
      }
    };
    getData();
  }, [userID, token]);

  const handleDelete = (pollid: string) => {
    const getstatus = async (): Promise<void> => {
      try {
        const deletedStatus = await serverAPI.deletePoll({
          pollid,
          token,
        });
      } catch (err) {}
    };
  };

  const Polls: Function = (): JSX.Element[] => {
    return pollList.reverse().map((item: RocketMeetPollFromDB) => (
      <div key={item._id}>
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
            <Button onClick={handleDelete(item._id)}>Delete</Button>
          </Card.Footer>
        </Card>
      </div>
    ));
  };

  const currentDate = Date.now();

  const Recents: Function = (): JSX.Element[] => {
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
  };

  return (
    <>
      <Row className="inner-container">
        <Col className="col-xl-8 col-lg-8 col-md-12">
          <h3 className="dash-your-polls">Your Polls </h3>

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
