import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import * as d3 from "d3";
import CalendarHeatmap from "react-calendar-heatmap";

let today = new Date();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [
        { date: "2016-01-01", count: 0 },
        { date: "2016-01-22", count: 0 },
        { date: "2016-01-30", count: 0 },
        { date: new Date(2016, 0, 4) }
      ],
      // How many days should be shown
      numDays: 365
    };
  }
  componentDidMount() {
    //fetching data from the web
    const url =
      "https://api.github.com/repos/facebook/react/stats/commit_activity";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        sortDate(data);
        let result = reshapeData(data, today);
        // this.setState({
        //   allCommits: data
        // });
        //do calculation inside this element
        // this.drawChart(data);
        console.log(result);
      });
  }
  drawChart(data) {
    //
  }

  render() {
    return (
      <div className="App">
        <h2>still working!</h2>
        <CalendarHeatmap
          // endDate={new Date("2017-01-01")}
          endDate={today}
          numDays={this.state.numDays}
          values={this.state.values}
          // classForValue={}
          showWeekdayLabels={true}
        />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}
function sortDate(data) {
  data.sort((a, b) => a.week - b.week);
  return data;
}

function reshapeData(data, today) {
  let very_begin = new Date(today)
  let counter = 0;
  data.map((each, i) => {
    let start_date = very_begin.getDate() + counter;
    let format_date = new Date(start_date);
    counter++;
    return each.days.map((each, i) => {
      return {
        date: format_date + i,
        count: each
      };
    });
  });

  //want to get the minimum week
  //get the index of the array
  //every week number * 7 + index + 1
}

export default App;
