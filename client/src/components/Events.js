// Events component displays all upcoming Zoom and Google Meet events

import React from "react";
import { ListGroupItem, Row, Col } from "reactstrap";

class Events extends React.Component {
  // convert military time to standard time
  convertMilitaryToStandard(time) {
    let timeInt = parseInt(time.substring(0, 2));
    if (timeInt === 0) {
      time = `12:${time.substring(3, 5)} AM`;
    } else if (timeInt === 12) {
      time = `12:${time.substring(3, 5)} PM`;
    } else if (timeInt > 12) {
      time = `${timeInt - 12}${time.substring(2)} PM`;
    } else if (timeInt < 10) {
      time = `${time.substring(1)} AM`;
    } else {
      time = `${time} AM`;
    }
    return time;
  }

  // converts Google Cal date-times (in yyyy-mm-ddTtime) to mm/dd/yyyy format
  convertGoogleDateTime(date) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(5, 7);
    let dd = date.substring(8, 10);
    let converted = mm + "/" + dd + "/" + yyyy;
    return converted;
  }

  render() {
    return this.props.events.length > 0 ? (
      <>
        {" "}
        {this.props.events.map((event) => {
          // convert Google Calendar times to more readable forma
          let startTime = event.start.dateTime.substring(11, 16);
          let endTime = event.end.dateTime.substring(11, 16);

          let start = this.convertMilitaryToStandard(startTime);
          let end = this.convertMilitaryToStandard(endTime);

          let day = event.start.dateTime;
          day = this.convertGoogleDateTime(day);
          day = new Date(day).toString().split(" ").slice(0, 4).join(" ");

          return (
            <ListGroupItem className="item" key={event.id}>
              <Row>
                <Col xs="10">
                  <strong>{event.summary}</strong>
                  <br></br>
                  <em>
                    {day} {start} to {end}
                  </em>
                  <br></br>
                  <a href={event.location ? event.location : event.hangoutLink}>
                    {event.location ? event.location : event.hangoutLink}
                  </a>
                </Col>
              </Row>
            </ListGroupItem>
          );
        })}
      </>
    ) : (
      ""
    );
  }
}

export default Events;
