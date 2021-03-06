import {connect} from 'react-redux';
import Graph from './components/Graph';

export default connect((store) => (
  {
    title: store.graphReducer.title,
    xScale: store.graphReducer.xScale,
    xDomain: store.graphReducer.xDomain,
    chartSeries: store.graphReducer.chartSeries,
    chartData: store.graphReducer.chartData,
    lastQueryTime: store.graphReducer.lastQueryTime,
    scale: store.graphReducer.scale,
    colorScale: store.graphReducer.colorScale,
    xAccessor: store.graphReducer.xAccessor,
    friendlyScale: store.graphReducer.friendlyScale,
    rawChartData: store.graphReducer.rawChartData
  }
))(Graph);

