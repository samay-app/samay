import {
  Alert,
  Button,
  Container,
  Form,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useState } from "react";
import Layout from "../../components/layout";
import { PollFromDBProps, MarkedProps } from "../../models/poll";

dayjs.extend(localizedFormat);

const Dashboard = (): JSX.Element => {
  const pollFromDB: PollFromDBProps = {
    _id: "5fecb40047984b4c55764b5e",
    name: "testPoll",
    description: "testPollDescription",
    open: true,
    userID: "vipinsuserid",
    interval: 3600000,
    choices: [
      1700562600000,
      1700566200000,
      1609855679000,
      2200268206000,
      1900532600000,
      1604353655000,
    ],
    marked: [
      {
        userID: "aryansuserid",
        choices: [1609855679000, 2200268206000],
      },
      {
        userID: "suhailsuserid",
        choices: [1609855679000, 1700566200000],
      },
      {
        userID: "anandsuserid",
        choices: [1700562600000, 1900532600000],
      },
      {
        userID: "anaswarasuserid",
        choices: [2200268206000],
      },
    ],
    createdAt: "2020-12-30T17:08:16.765Z",
    updatedAt: "2020-12-30T17:08:16.765Z",
    __v: 0,
  };

  const sortedChoices = pollFromDB.choices.sort((a, b) => a - b);

  const [newUserMarked, setNewUserMarked] = useState<MarkedProps>({
    userID: "",
    choices: [],
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setNewUserMarked({ ...newUserMarked, userID: value });
  };

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    if (checked) {
      const newChoices = newUserMarked.choices;
      newChoices.push(parseInt(value, 10));
      setNewUserMarked({ ...newUserMarked, choices: newChoices });
    } else {
      const newChoices = newUserMarked.choices;
      newChoices.splice(newChoices.indexOf(parseInt(value, 10)), 1); // remove the unchecked element from array
      setNewUserMarked({ ...newUserMarked, choices: newChoices });
    }
  };

  const handleSubmit = (): void => {
    // send newUserMarked to server
  };

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1>{pollFromDB.name}</h1>
            {pollFromDB.description}
            <Alert variant={pollFromDB.open ? "success" : "secondary"}>
              {pollFromDB.open ? "OPEN" : "CLOSED"}
            </Alert>
            By {pollFromDB.userID} | Created on{" "}
            {dayjs(pollFromDB.createdAt).format("DD/MM/YYYY")}
            <Table bordered>
              <thead>
                <tr>
                  <th>
                    {pollFromDB.marked ? pollFromDB.marked.length : 0}{" "}
                    participants
                  </th>
                  {sortedChoices.map((idx) => (
                    <th key={idx}>{dayjs(idx).format("llll")}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pollFromDB.marked?.map((idx) => (
                  <tr key={idx.userID}>
                    <td>{idx.userID}</td>
                    {sortedChoices.map((choiceIdx) => (
                      <td
                        key={choiceIdx}
                        className={
                          idx.choices.includes(choiceIdx)
                            ? "slot-checked"
                            : "slot-unchecked"
                        }
                      >
                        {idx.choices.includes(choiceIdx) ? "✔" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      required
                      onChange={handleNameChange}
                    />
                  </td>
                  {sortedChoices.map((idx) => (
                    <td key={idx} className="slot-checkbox-cell">
                      <Form.Check
                        value={idx}
                        className="slot-checkbox"
                        onChange={handleChoiceChange}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
            <Button
              variant="primary"
              type="submit"
              disabled={
                !newUserMarked.userID || newUserMarked.choices.length === 0
              }
              onClick={handleSubmit}
            >
              Mark your choice
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
export default Dashboard;
