import { Dispatch } from "react";
import { Trash } from "react-bootstrap-icons";
import { Card, Badge, Row, Col, Button } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { RocketMeetPollFromDB } from "../../models/poll";

dayjs.extend(localizedFormat);

const Polls: Function = (props: {
  pollList: RocketMeetPollFromDB[];
  setPollIDToDelete: Dispatch<string>;
  setModalShow: Dispatch<boolean>;
}): JSX.Element[] => {
  const { pollList, setPollIDToDelete, setModalShow } = props;
  const sorted = pollList.sort(
    (a: RocketMeetPollFromDB, b: RocketMeetPollFromDB) => {
      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    }
  );
  return sorted.map((item: RocketMeetPollFromDB) => (
    <div key={item._id}>
      <Row>
        <Col className="col-11">
          <Card className="pt-4 px-4 my-2 dashboard-card">
            <Row>
              <div className="col-8">
                <Card.Title>
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
            <Card.Body>
              <a
                href={`/poll/${item._id}`}
                aria-label="stretched link"
                className="stretched-link card-bdy"
              >
                {item.description}
              </a>
            </Card.Body>
            <Card.Footer className="px-0">
              <span className="card-created">
                Created on: {dayjs(item.createdAt).format("DD/MM/YYYY")}
              </span>
            </Card.Footer>
          </Card>
        </Col>
        <Col className="col-1 p-0">
          <Button
            variant="outline-light"
            className="my-2 rm-delete-button"
            onClick={(): void => {
              setPollIDToDelete(item._id);
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

export default Polls;
