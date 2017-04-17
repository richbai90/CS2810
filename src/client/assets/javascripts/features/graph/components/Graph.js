import React, {Component} from 'react';
import GraphView from './GraphView';
import d3 from 'd3';

import actions from '../api/actions';

export default class Graph extends Component {
  constructor() {
    super();
    this.interval = false;
  }

  static xProvider(d) {
    return d3.time.format('%Y-%m-%dT%H:%M:%SZ').parse(d.month);
  }

  updateChartData() {
    this.props.dispatch(actions.updateChartData(this.props.lastQueryTime, this.props.scale));
  }

  startTimer() {
    this.interval = setInterval(this.updateChartData, 900000);
  }

  componentWillMount() {
    this.updateChartData();
    this.startTimer();
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  render() {
    return <GraphView
      chartData={this.props.chartData}
      chartSeries={this.props.chartSeries}
      x={(d) => d3.time.format('%Y-%m-%dT%H:%M:%SZ').parse(d.created_at)}
      y={(field) => parseFloat(field)}
      xScale={this.props.xScale}
      xDomain={this.props.xDomain}
      title={this.props.title}
    />;
  }
}
