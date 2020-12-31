import { Alert } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { PollFromDBProps } from "../models/poll";

dayjs.extend(localizedFormat);

const PollInfo = (props: { pollFromDB: PollFromDBProps }): JSX.Element => {
  const { pollFromDB } = props;

  return (
    <>
      <h1>{pollFromDB.name}</h1>
      {pollFromDB.description}
      <Alert variant={pollFromDB.open ? "success" : "secondary"}>
        {pollFromDB.open ? "OPEN" : "CLOSED"}
      </Alert>
      By {pollFromDB.userID} | Created on{" "}
      {dayjs(pollFromDB.createdAt).format("DD/MM/YYYY")}
    </>
  );
};

export default PollInfo;
