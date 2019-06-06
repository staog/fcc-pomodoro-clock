import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Pomodoro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      break: 5,
      session: 25,
      type: "session",
      time: 1500000,
      active: false
    }
  }

  handleTimers = (inc, mode) => {
    this.setState({ [mode]: this.state[mode] + (inc ? 1 : -1) })
  }

  render() {
    return (
      <div id="container">
        <header>
          <h1>Cronometrare Di Pomodoro</h1>
        </header>
        <div className="row">
          <div class="two-halfs">
            <h2 id="break-label">Break Length</h2>
            <button id="break-increment" type="button" className="buttons n-resize" handleClick={this.handleTimers}><i className="fa fa-plus"></i></button>
            <span id="break-length" className="white-letters">{this.state.break}</span>
            <button id="break-decrement" type="button" className="buttons s-resize"><i className="fa fa-minus"></i></button>
          </div>
          <div class="two-halfs">
            <h2 id="session-label">Session Length</h2>
            <button id="session-increment" type="button" className="buttons n-resize"><i className="fa fa-plus"></i></button>
            <span id="session-length" className="white-letters">{this.state.session}</span>
            <button id="session-decrement" type="button" className="buttons s-resize"><i className="fa fa-minus"></i></button>
          </div>
        </div>
        <br />
        <div id="timer">
          <div id="timer-label">{this.state.type === "session" ? "Session" : "Break"}</div>
          <div id="time-left" className="white-letters">{this.state.time}</div>
        </div>
        <div className="row">
          <button id="start_stop" className="controls" active={this.state.active}><i class="fa fa-play"></i>/<i class="fa fa-pause"></i></button>
          <button id="reset" className="controls"><i class="fa fa-refresh"></i></button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById('root'));
