//Initializing variables for the JSON object
var jsonObj;
var geoArray;
var requestURL = 'https://api.thingspeak.com/channels/259671/feeds.json?api_key=EVHMI98M214INT1N';
var request = new XMLHttpRequest();

//Making the JSON request after checking everything is working with the client and server.
request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    jsonObj = JSON.parse(this.responseText);
    //Taking the JSON and taking the important info into an array.
    geoArray = jsonObj['feeds'];
    console.log(geoArray);
  }
};
request.open('GET', requestURL);
request.send();

//The function for the buttons on the webpage.
//The different buttons take different amounts of readings.
function onClick(amnt) {
  buildGraph(geoArray, amnt);
}

//The actual function run by clicking the buttons.
function buildGraph(arr, amnt) {
  //document.writeln('function begin');
  //Just in case the requested number of readings is larger than what is available.
  if (amnt > arr.length) {
    amnt = arr.length;
  }
  //Variables trace1 through 5 are the 5 different readings.
  //The variables are set up for the graphing library used.
  var trace1 = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'OAT'
  };
  var trace2 = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'EWT'
  };
  var trace3 = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'LWT'
  };
  var trace4 = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'ETT'
  };
  var trace5 = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'LTT'
  };

  //Variables i and k are used in for loops.
  var i;
  var k;

  //These two arrays are for easy access to variables and the id's
  //of div tags down in the HTML portion of the code.
  var traces = [trace1, trace2, trace3, trace4, trace5];
  var fields = ['field1', 'field2', 'field3', 'field4', 'field5'];
  //document.writeln(arr.length);

  //Nested for loops to pull all the info from the JSON array.
  for (k = 0; k < fields.length; k++) {
    //var out = "";
    for (i = arr.length - 1; i > arr.length - amnt - 1; i--) {
      /*  Starting with field1, this pushes each reading from the
       *  JSON array, and pushes the value into the 'y' of the graph.
       *  The 'x' is then incramented the next time value.
       */
      traces[k].y.unshift(arr[i][fields[k]]);
      traces[k].x.unshift(i);
      //out += arr[i][fields[k]] + ", ";
    }
    //document.getElementById(fields[k]).innerHTML = out;
  }

  //After recording all the data into the different traces,
  //we actually go out and graph the stuff.
  var data = [trace1, trace2, trace3, trace4, trace5];
  Plotly.newPlot('graph', data);
}
