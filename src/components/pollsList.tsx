import { useEffect, useState } from "react";
import NProgress from "nprogress";
import { useSelector } from "react-redux";
import { Card, Badge, Row, Col, CardColumns } from "react-bootstrap";
import { serverAPI } from "../api/server";
import { encrypt } from "../helpers/helpers";
import { RocketMeetPollFromDB } from "../models/poll";
import { RootState } from "../store/store";

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
            "You haven't created any polls yet. Start one by clicking the new poll button above"
          );
        } else {
          setPollList([]);
          setMessage("Ouch ! an error occured . please try again");
        }
      } catch (err) {
        setMessage("Ouch ! an error occured . please try again");
        NProgress.done();
      }
    };
    getData();
  }, [userID, token]);

  const Allpolls: Function = (): JSX.Element[] => {
    return pollList.reverse().map((item: RocketMeetPollFromDB) => (
      <div key={item._id}>
        <Card bg="dark" text="white" className="pt-4 px-4 my-2 cardindash">
          <Card.Title className="d-flex flex-row justify-content-between">
            <span className="card-title">{item.title}</span>
            <Badge variant={item.open ? "success" : "secondary"}>
              {item.open ? "open" : "closed"}
            </Badge>
          </Card.Title>
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
              Created : {item.createdAt.substring(0, 10)}
            </span>
          </Card.Footer>
        </Card>
      </div>
    ));
  };
  const currentDate = Date.now();
  const convertedDate = (time: number | undefined): string => {
    let monthArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date(time ?? 0);

    let month = monthArr[date.getMonth()];

    let day = date.getDate();

    let hours = date.getHours();

    let minutes = `0${date.getMinutes()}`;

    let convdataTime = `${day}-${month} at ${hours}:${minutes.substr(-2)}`;
    return convdataTime;
  };
  const Recents: Function = (): JSX.Element[] => {
    return pollList.reverse().map((item: RocketMeetPollFromDB) => (
      <div key={item.createdAt}>
        {!item.open && (item.finalChoice?.start || 0) > currentDate ? (
          <div className="d-block m-1 p-2 upcomings">
            <b>{item.title}</b> to be conducted on{" "}
            {convertedDate(item.finalChoice?.start)}
          </div>
        ) : (
          <></>
        )}
      </div>
    ));
  };

  return (
    <>
      <Row className="mt-2">
        <Col className="col-xl-8 col-lg-8 col-md-12">
          <h3 className="y-polls"> Your Polls </h3>

          <div className="mb-2 mt-3">
            {pollList && pollList.length > 0 ? (
              <CardColumns>
                <Allpolls />
              </CardColumns>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </Col>
        <Col className="col-xl-4 col-lg-4 recents">
          <h3 className="y-polls ml-4"> Upcoming things</h3>
          <div className="border-left recent-div">
            <Recents />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PollsList;
