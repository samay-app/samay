import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Chart from "./Chart";
import { ChartDataArgs, RocketMeetPollFromDB } from "../../models/poll";
import { ChartData } from "../../helpers/helpers";

const ChartModal = (props: {
  pollFromDB: RocketMeetPollFromDB;
}): JSX.Element => {
  const { pollFromDB } = props;
  const [show, setShow] = useState(false);
  const [data, setData] = useState<ChartDataArgs>({ labels: [], datasets: [] });

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  useEffect((): void => {
    setData(ChartData(pollFromDB));
  }, [pollFromDB]);

  return (
    <>
      <button type="button" onClick={handleShow} className="chart_button">
        <img
          src="/pie-chart.svg"
          alt="show chart"
          className="chart_button_icon"
        />
      </button>
      <Modal show={show} onHide={handleClose} className="special_modal">
        <Modal.Header closeButton>
          <Modal.Title>Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Chart ChartData={data} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChartModal;
