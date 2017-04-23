import React, {Component} from 'react';
import GraphView from './GraphView';

import actions from '../api/actions';

export default class Graph extends Component {
  constructor() {
    super();
    this.interval = false;
  }

  mapSeries(data, series) {
    let _data = [];
    for (let line of series) {
      let entry = { x: [], y: [], type: 'scatter', name: '' };
      data.map((d) => {
        entry.x.push(d.created_at.split('T').join(' ').split('.').slice('-1').join('').split('Z').join(''));
        entry.y.push(d[line.field]);
        entry.type = 'scatter';
        entry.name = line.name;
      });
      _data.push(entry);
    }

    return _data;
  }

  updateChartData() {
    //todo Make this dynamic
    this.props.dispatch(actions.updateChartData(this.props.lastQueryTime, this.props.scale));
  }

  startTimer(init = false) {
    if (init) {
      setTimeout(this.updateChartData.bind(this), 500);
    }

    this.interval = setInterval(this.updateChartData.bind(this), 60000);
  }

  childDidMount() {
    this.updateChartData();
    this.startTimer(true);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  onChange(scale) {
    this.props.dispatch(actions.UpdateScale(scale));
    //Scale the existing data so we can view the results in real time
    this.props.dispatch(actions.scaleData(this.props.chartData, this.props.rawChartData, scale));
  }

  render() {
    return (<GraphView
      data={this.mapSeries(this.props.chartData, this.props.chartSeries)}
      title={this.props.title}
      layout={this.layout}
      onChange={this.onChange.bind(this)}
      friendlyScale={this.props.friendlyScale}
      componentDidMount={this.childDidMount.bind(this)}

    />);
  }
}

Graph.layout = {
  xaxis: { type: 'date', title: 'Date' },
  yaxis: { title: 'Temperature' }
}
