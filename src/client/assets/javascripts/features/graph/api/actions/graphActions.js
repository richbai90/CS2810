import * as actions from './graphActionTypes';
import axios from 'axios';
import moment from 'moment';

// For zooming out beyond the current available data set
export function UpdateScale(scale) {
  return (dispatch) => {
    let newScale,
      friendlyScale;

    switch (scale) {
      case '0':
        newScale = '';
        friendlyScale = 'Beginning of Time';
        break;
      case '25':
        newScale = 'P3Y';
        friendlyScale = '3 Years';
        break;
      case '50':
        newScale = 'P1Y';
        friendlyScale = '1 Year';
        break;
      case '75':
        newScale = 'P6M';
        friendlyScale = '6 Months';
        break;
      case '100':
        newScale = 'P3M';
        friendlyScale = '3 Months';
        break;
      default:
        newScale = '';
        friendlyScale = 'Beginning of Time';
    }
    dispatch({ type: actions.UPDATE_SCALE, payload: newScale });
    dispatch({ type: actions.UPDATE_FRIENDLY_SCALE, payload: friendlyScale });
  }

}

// Sets the last query time to the current time
export function updateLastQueryTime() {
  return { type: actions.UPDATE_LAST_QUERY_TIME, payload: Date.now() };
}

// Get new chart data *scale* days since the last query date
export function updateChartData(lastQueryTime = new Date(), scale = 'P1Y') {
  return (dispatch) => {
    let date = lastQueryTime.toISOString();
    let url = 'api/graph/update_chart_data.php';
    url += '?date=' + encodeURIComponent(date) + ((scale === '') ? '' : '&interval=' + encodeURIComponent(scale));
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

export function scaleData(data, rawData, interval) {
  return function (dispatch) {
    if (!rawData.length) {
      // keep a clone of the original data so we can scale it back
      rawData = data.map((d) => (Object.assign({}, d)));
      data = rawData.map((d) => {
        let now = moment();
        let date = moment(d.created_at, 'YYYY-MM-DD HH:mm:ss');
        interval = interval.slice('1');
        let scalar = interval.slice(-1);
        let period = interval.split(/[YMDH]/).join();

        now.subtract(parseInt(period), ((scalar === 'M') ? scalar : scalar.toLowerCase()));

        if (date >= now) {
          return d;
        }

      });

    }

    dispatch({ type: actions.UPDATE_RAW_CHART_DATA, payload: rawData });
    dispatch({ type: actions.UPDATE_CHART_DATA, payload: data });

  };

}
