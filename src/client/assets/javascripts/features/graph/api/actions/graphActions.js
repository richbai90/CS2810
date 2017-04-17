import * as actions from './graphActionTypes';
import axios from 'axios';

// For zooming out beyond the current available data set
export function UpdateScale(currentScale) {
  let newScale = currentScale.split(' ');
  newScale[0] = newScale.parseInt + 30;
  return { type: actions.UPDATE_SCALE, payload: newScale.join(' ') };
}

// Sets the last query time to the current time
export function updateLastQueryTime() {
  return { type: actions.UPDATE_LAST_QUERY_TIME, payload: Date.now() };
}

// Get new chart data *scale* days since the last query date
export function updateChartData(lastQueryTime = new Date, scale = '30 days') {
  return function (dispatch) {
    let date = lastQueryTime.toISOString();
    let url = 'api/graph/update_chart_data.php';
    url += '?date=' + encodeURIComponent(date) + '&interval=' + encodeURIComponent(scale);
    let request = axios.get(url);

    request.then((response) => {
      dispatch({ type: actions.UPDATE_CHART_DATA, payload: response.data });
    }).catch((e) => {
      if (console) console.warn(e);
    });
  };
}

// Change the x axis data set
export function changeXScale(scale) {
  return { type: actions.CHANGE_XSCALE, payload: scale };
}

// change the graph title
export function changeTitle(title) {
  return { type: actions.CHANGE_TITLE, payload: title };
}
