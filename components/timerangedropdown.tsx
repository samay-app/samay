import { DropdownButton, Dropdown } from "react-bootstrap";

const TimeRangeDropdown = (props: {
  onDropNSelect: (arg0: number) => void;
}): JSX.Element => {
  const timeRange: { timeRng: string; timeFact: number }[] = [
    { timeRng: "15 minutes", timeFact: 0.25 },
    { timeRng: "30 minutes", timeFact: 0.5 },
    { timeRng: "1 hour", timeFact: 1 },
    { timeRng: "2 hour", timeFact: 2 },
    { timeRng: "4 hour", timeFact: 4 },
    { timeRng: "6 hour", timeFact: 6 },
    { timeRng: "12 hour", timeFact: 12 },
    { timeRng: "1 day", timeFact: 24 },
  ];

  function handleDropdownClick(
    event: React.SyntheticEvent<unknown, Event>
  ): void {
    const { value } = event.target;
    props.onDropNSelect(value);
  }

  return (
    <DropdownButton title="Time Range">
      {timeRange.map((timeDuration) => (
        <Dropdown.Item
          as="button"
          key={timeDuration.timeFact}
          onSelect={(_, event): void => handleDropdownClick(event)}
          value={timeDuration.timeFact}
        >
          {timeDuration.timeRng}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default TimeRangeDropdown;
