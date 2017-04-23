import * as actionTypes from '../actions/graphActionTypes';
const defaultState = {
  title: 'GeoThermal - Cabin',
  xScale: { unit: 'month', interval: 1 },
  colorScale: (n) => {
    let colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    return colors[n % colors.length];
  },

  xAccessor: (d) => {
    return new Date(d.created_at);
  },

  chartSeries: [
    {
      field: 'field1',
      name: 'temp1'
    },

    {
      field: 'field2',
      name: 'temp2'
    },

    {
      field: 'field3',
      name: 'temp3'
    },

    {
      field: 'field4',
      name: 'temp4'
    },

    {
      field: 'field5',
      name: 'temp5'
    }
  ],
  chartData: [{
    created_at: '2017-04-15T22:53:11Z',
    entry_id: 0,
    field1: '-127.0',
    field2: '-127.0',
    field3: '-127.0',
    field4: '-127.0',
    field5: '-127.0'
  },
    {
      created_at: '2017-05-15T22:53:11Z',
      entry_id: 0,
      field1: '12',
      field2: '40',
      field3: '30.5',
      field4: '-19.4',
      field5: '16.56'
    }, {
      created_at: '2017-06-15T22:53:11Z',
      entry_id: 0,
      field1: '20',
      field2: '22.01',
      field3: '-10.16',
      field4: '12.4',
      field5: '20.12'
    }],
  rawChartData: [],
  lastQueryTime: new Date(),
  scale: '',
  friendlyScale: 'Beginning of Time'
};

export default function graphReducer(state = defaultState, actions) {

  function changeState(...updates) {
    return Object.assign({}, state, updates);
  }

  let type = actions.type;
  let payload = actions.payload;

  switch (type) {
    case actionTypes.CHANGE_TITLE:
      return changeState({ title: payload });
    case actionTypes.CHANGE_XSCALE:
      return changeState({ xScale: payload });
    case actionTypes.UPDATE_CHART_DATA:
      return Object.assign({}, state, { chartData: payload });
    case actionTypes.UPDATE_LAST_QUERY_TIME:
      return changeState({ lastQueryTime: Date.now() });
    case actionTypes.UPDATE_SCALE:
      return Object.assign({}, state, { scale: payload });
    case actionTypes.UPDATE_FRIENDLY_SCALE:
      return Object.assign({}, state, { friendlyScale: payload });
    case actionTypes.UPDATE_RAW_CHART_DATA:
      return Object.assign({}, state, { rawChartData: payload });
    default:
      return defaultState;
  }
}

