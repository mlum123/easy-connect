import React from "react";

class ZoomBox extends React.Component {
  constructor() {
    super();
    this.state = {
      meetings: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/zoom")
      .then((res) => console.log(res))
      .then(
        (meetings) => console.log(meetings)
        /*
        this.setState({ meetings }, () =>
          console.log("Meetings fetched..", meetings)
        )
        */
      );
  }

  render() {
    return (
      <div>
        <h2>Zoom</h2>
        <ul>
          {this.state.meetings.map((meeting) => (
            <li key={meeting.id}>{meeting}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ZoomBox;
