import { useEffect, useState, useCallback } from "react";
import NProgress from "nprogress";
import { useSelector } from "react-redux";
import { Row, Col, CardColumns } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPolls, deletePoll } from "../../utils/api/server";
import { encrypt } from "../../helpers/helpers";
import { RocketMeetPollFromDB } from "../../models/poll";
import { RootState } from "../../store/store";
import ResponseMessage from "../ResponseMessage";
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

  const getData = useCallback(async (): Promise<void> => {
    try {
      NProgress.start();
      const fetchedPolls = await getPolls({
        encryptedEmailID,
        token,
      });
      NProgress.done();
      if (fetchedPolls.statusCode === 200) {
        setPollList(fetchedPolls.data);
        setMessage("You don't have any polls yet.");
      } else if (fetchedPolls.statusCode === 401) {
        setPollList([]);
        setMessage("Unable to fetch polls. Please refresh.");
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
      const deletedStatus = await deletePoll(voteArgs);
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

  return (
    <>
      <Row className="dashboard-polls-row">
        <Col className="col-xl-8 col-lg-8 col-md-12">
          <h3 className="dash-your-polls">Your Polls</h3>
          <div className="mb-2 mt-3">
            {pollList && pollList.length > 0 ? (
              <CardColumns>
                <Polls pollList={pollList} handleDelete={handleDelete} />
              </CardColumns>
            ) : (
              <span>{message}</span>
            )}
          </div>
        </Col>
      </Row>

      <ResponseMessage
        response={response}
        onHide={(): void => setResponse({ status: false, type: "", msg: "" })}
      />
    </>
  );
};

export default PollsList;
