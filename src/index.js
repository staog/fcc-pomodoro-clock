import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Pomodoro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakMinutes: 5,
      sessionMinutes: 25,
      type: "session",
      breakTime: 5 * 60 * 1000,
      sessionTime: 25 * 60 * 1000,
    }
  }

  handleClick = e => {
    let breakMinutes = this.state.breakMinutes
    let sessionMinutes = this.state.sessionMinutes
    let type = this.state.type
    let breakTime = this.state.breakTime
    let sessionTime = this.state.sessionTime
    switch (true) {
      case /\bbreak-increment\b/.test(e.target.id):
        if (breakMinutes < 60) {
          breakMinutes += 1
          breakTime += 60000
        }
        break
      case /\bbreak-decrement\b/.test(e.target.id):
        if (breakMinutes > 0) {
          breakMinutes -= 1
          breakTime -= 60000
        }
        break
      case /\bsession-increment\b/.test(e.target.id):
        if (sessionMinutes < 60) {
          sessionMinutes += 1
          sessionTime += 60000
        }
        break
      case /\bsession-decrement\b/.test(e.target.id):
        if (sessionMinutes > 0) {
          sessionMinutes -= 1
          sessionTime -= 60000
        }
        break
    }
    this.setState({
      breakMinutes: breakMinutes,
      sessionMinutes: sessionMinutes,
      type: type,
      breakTime: breakTime,
      sessionTime: sessionTime
    })
  }

  // countDown() {
  //   let sessionTime = this.state.sessionTime
  //   sessionTime -= 1000
  //   this.setState({
  //     sessionTime: sessionTime
  //   })
  // }
  //
  // function startTimer = setInterval(countDown, 1000)
  //
  // handlePlayAndPause = e => {
  //   if (e.target.id === "start_stop") {
  //     startTimer()
  //   }
  // }

  // Treba da uglavim negde u funkciju da mi pusta zvuk
  // let sound = document.getElementById('beep')
  // this.playAudio(sound)

  handleReset = e => {
    if (e.target.id === "reset") {
      this.setState({
        breakMinutes: 5,
        sessionMinutes: 25,
        type: "session",
        breakTime: 5 * 60 * 1000,
        sessionTime: 25 * 50 * 1000
      })
    }
  }

  playAudio = (sound) => {
    sound.currentTime = 0
    sound.play()
  }

  render() {
    return (
      <div id="container">
        <header>
          <h1>Cronometrare Di Pomodoro</h1>
        </header>
        <br />
        <div id="timer">
          <div id="timer-label">{this.state.type === "session" ? "Session" : "Break"}</div>
          <div id="time-left">{this.state.sessionTime}</div>
        </div>
        <div className="row">
          <div className="two-halfs">
            <h2 id="break-label">Break Length</h2>
            <button id="break-increment" type="button" className="buttons" onClick={this.handleClick}>+</button>
            <div className="lengths">
              <span id="break-length">{this.state.breakMinutes}</span>
            </div>
            <button id="break-decrement" type="button" className="buttons" onClick={this.handleClick}>-</button>
          </div>
          <div className="two-halfs">
            <h2 id="session-label">Session Length</h2>
            <button id="session-increment" type="button" className="buttons" onClick={this.handleClick}>+</button>
            <div className="lengths">
              <span id="session-length">{this.state.sessionMinutes}</span>
            </div>
            <button id="session-decrement" type="button" className="buttons" onClick={this.handleClick}>-</button>
          </div>
        </div>
        <br />
        <div className="row">
          <button id="start_stop" className="controls" active={this.state.type} onClick={this.handlePlayAndPause}><i className="fa fa-play"></i>/<i className="fa fa-pause"></i></button>
          <button id="reset" className="controls" onClick={this.handleReset}><i className="fa fa-refresh"></i></button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById('root'));
