import React, {Component, PropTypes} from 'react';
import { LineZoom } from 'react-d3-zoom';

export default class GraphView extends Component {
  static propTypes = {
    chartData: PropTypes.object.isRequired,
    chartSeries: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    x: PropTypes.func.isRequired,
    xDomain: PropTypes.string.isRequired,
    xScale: PropTypes.string.isRequired,
    y: PropTypes.func

  };

  render() {
    return (
      <div className="graph">
        <LineZoom
          title={this.props.title}
          data={this.props.chartData}
          width={800}
          height={600}
          margins={{top: 20, right: 10, bottom: 20, left: 10}}
          chartSeries={this.props.chartSeries}
          x={this.props.x}
          xDomain={this.props.xDomain}
          xScale={this.props.xScale}
          y={this.props.y}
        />
      </div>
    );
  }
}
