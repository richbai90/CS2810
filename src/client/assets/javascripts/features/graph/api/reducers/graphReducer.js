import * as actions from '../actions/graphActionTypes';
const defaultState = {
  title: 'GeoThermal - Cabin',
  xScale: 'time',
  xDomain: 'created_at',

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
    created_at: formatDate(new Date()),
    entry_id: 0,
    field1: '-127.0',
    field2: '-127.0',
    field3: '-127.0',
    field4: '-127.0',
    field5: '-127.0'
  }],
  lastQueryTime: new Date(),
  scale: '30 Days'
};

export default function graphReducer(type, payload) {

  function changeState(...updates) {
    return Object.assign({}, defaultState, updates);
  }

  switch (type) {
    case actions.CHANGE_TITLE:
      return changeState({ title: payload });
    case actions.CHANGE_XSCALE:
      return changeState({ xScale: payload });
    case actions.UPDATE_CHART_DATA:
      return changeState({ chartData: payload });
    case actions.UPDATE_LAST_QUERY_TIME:
      return changeState({ lastQueryTime: Date.now() });
    case actions.UPDATE_SCALE:
      return changeState({ scale: payload });
  }

  return defaultState;
}

function formatDate(date) {
  let dateArr = date.toISOString().split('.');
  dateArr.splice(-1);
  return dateArr.join('') + 'Z';
}

