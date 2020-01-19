const sound = document.getElementById('beep')

class Pomodoro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakMinutes: 5,
      sessionMinutes: 25,
      active: false,
      type: "session",
      currentTime: 25 * 60 * 1000
    }
  }

  handleClick = e => {
    let breakMinutes = this.state.breakMinutes
    let sessionMinutes = this.state.sessionMinutes
    let type = this.state.type
    let currentTime = this.state.currentTime
    switch (true) {
      case /\bbreak-increment\b/.test(e.target.id):
        if (breakMinutes < 60) {
          breakMinutes += 1
        }
        break
      case /\bbreak-decrement\b/.test(e.target.id):
        if (breakMinutes > 1) {
          breakMinutes -= 1
        }
        break
      case /\bsession-increment\b/.test(e.target.id):
        if (sessionMinutes < 60) {
          sessionMinutes += 1
          currentTime += 60000
        }
        break
      case /\bsession-decrement\b/.test(e.target.id):
        if (sessionMinutes > 1) {
          sessionMinutes -= 1
          currentTime -= 60000
        }
        break
    }
    this.setState({
      breakMinutes: breakMinutes,
      sessionMinutes: sessionMinutes,
      type: type,
      currentTime: currentTime
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTime === 0 && prevState.type === 'session') {
      this.setState({ currentTime: this.state.breakMinutes * 60 * 1000, type: 'break'})
      sound.pause()
      sound.currentTime = 0
      sound.play()
    }
    if (prevState.currentTime === 0 && prevState.type === 'break') {
      this.setState({ currentTime: this.state.sessionMinutes * 60 * 1000, type: 'session'})
      sound.pause()
      sound.currentTime = 0
      sound.play()
    }
  }

  handlePlayAndPause = e => {
    if (e.target.id === "start_stop") {
      if (this.state.active) {
        clearInterval(this.countDown)
        this.setState({ active: false })
      }
      else {
        this.countDown = setInterval(() => this.setState({currentTime: this.state.currentTime - 1000, active: true}), 1000)
      }
    }
  }

  handleReset = e => {
    if (e.target.id === "reset") {
      this.setState({
        breakMinutes: 5,
        sessionMinutes: 25,
        active: false,
        type: "session",
        currentTime: 25 * 60 * 1000
      })
      clearInterval(this.countDown)
      sound.pause()
      sound.currentTime = 0
    }
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
          <div id="time-left">{this.state.currentTime === 3600000 ? "60:00" : moment(this.state.currentTime).format("mm:ss")}</div>
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
          <button id="start_stop" className="controls" type={this.state.type} active={this.state.active} onClick={this.handlePlayAndPause}>{ this.state.active ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i> }</button>
          <button id="reset" className="controls" onClick={this.handleReset}><i className="fa fa-refresh"></i></button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById('root'));
