import React, {Component, PropTypes} from 'react';

export default class GraphView extends Component {
  static propTypes = {
    chartData: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    colors: PropTypes.func,
    xScale: PropTypes.object

  };

  componentWillReceiveProps() {
    let newData = {
      x: [],
      y: []
    }

    let xY = this.props.data.map((d) => {
      return [d.x, d.y];
    }).reduce((acc, cv, ci, arr) => {
      newData.x.push(cv[0]);
      newData.y.push(cv[1]);
    }, []);

    Plotly.restyle(this.refs.graphContainer, newData);
  }

  componentDidMount() {
    this.props.componentDidMount();
    Plotly.newPlot(this.refs.graphContainer, this.props.data, this.props.layout);
  }

  onChange(evt) {
    this.props.onChange(evt.target.value);
  }

  render() {
    return (
      <div>
        <div id="graph" ref='graphContainer'>
        </div>
        <div style={{ margin: '0 auto' }}>
        {/*<label>*/}
        {/*Scale*/}
        {/*<input type="range" min="0" max="100" step="25"*/}
        {/*onChange={this.onChange.bind(this)}/> {this.props.friendlyScale}*/}
        {/*</label>*/}
        </div>
      </div>
    );
  }
}
