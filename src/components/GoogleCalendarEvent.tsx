import React, { useEffect, useState } from "react";

function Calendar(props: any): JSX.Element {
  let eventModel: Array<object> = [];
  type Event = typeof eventModel;
  const [events, setEvents] = useState<Event>(eventModel);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const today = new Date();
  function parseDate(dateTime: string): string {
    return dateTime.substr(0, dateTime.indexOf("T"));
  }
  function parseTime(dateTime: string): string {
    const timeTimezone = dateTime.substr(dateTime.indexOf("T") + 1);
    return timeTimezone.substr(0, timeTimezone.indexOf("+"));
  }
  function getMonthName(date: string): string {
    return months[Number(date.substr(5, 2)) - 1];
  }
  function getYear(dateTime: string): number {
    return Number(parseDate(dateTime).substr(0, 4));
  }
  function getMonth(dateTime: string): number {
    const date = parseDate(dateTime);
    return Number(date.substr(date.indexOf("-") + 1, 2));
  }
  function getDate(dateTime: string): number {
    return Number(parseDate(dateTime).substr(-2, 2));
  }
  function getHours(dateTime: string): number {
    return Number(parseTime(dateTime).substr(0, 2));
  }
  function getMinutes(dateTime: string): number {
    return Number(parseTime(dateTime).substr(3, 2));
  }

  function checkHoursMinutes(dateTime: string): boolean {
    if (today.getHours() === getHours(dateTime)) {
      if (today.getMinutes() < getMinutes(dateTime)) {
        return true;
      }
      return false;
    }
    if (today.getHours() < getHours(dateTime)) {
      return true;
    }
    return false;
  }
  function filterEvent(event: any): any {
    if (
      today.getFullYear() <= getYear(event.start.dateTime) &&
      today.getMonth() + 1 <= getMonth(event.start.dateTime)
    ) {
      if (
        (today.getDate() === getDate(event.start.dateTime) &&
          checkHoursMinutes(event.start.dateTime)) ||
        today.getDate() < getDate(event.start.dateTime) ||
        (today.getDate() > getDate(event.start.dateTime) &&
          today.getMonth() + 1 < getMonth(event.start.dateTime))
      ) {
        return (
          <div key={event.id} className="calendar-event-wrapper">
            <div className="calendar-event-date-month-wrapper">
              <h2 className="calendar-event-date">
                {parseDate(event.start.dateTime).substr(8, 2)}
              </h2>
              <p className="calendar-event-month">
                {getMonthName(parseDate(event.start.dateTime))}
              </p>
            </div>
            <div className="calendar-event-description">
              <a
                href={event.htmlLink}
                className="calendar-event-title"
                target="_blank"
                rel="noreferrer"
              >
                {event.summary}
              </a>
              <p className="calendar-event-date-time">
                {parseTime(event.start.dateTime)}
              </p>
            </div>
          </div>
        );
      }
    }
    return "";
  }
  useEffect(() => {
    function getEvents(): void {
      function start(): void {
        // @ts-ignore
        gapi.client
          .init({
            apiKey: `${props.API}`,
          })
          .then(() => {
            // @ts-ignore
            return gapi.client.request({
              path: `https://www.googleapis.com/calendar/v3/calendars/${props.calendarID}/events/?singleEvents=True&orderBy=startTime`,
            });
          })
          .then((response: any): void => {
            let event = response.result.items;
            setEvents(event);
          });
      }
      // @ts-ignore
      gapi.load("client", start);
    }
    getEvents();
  }, []);
  return (
    <div className="calendar-event-container">
      <h1 className="calendar-event-container-title">Upcoming Events</h1>
      {console.log(events)}
      {events.map((event: any) => filterEvent(event))}
    </div>
  );
}

export default Calendar;
