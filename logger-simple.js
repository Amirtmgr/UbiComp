// Create the file in append mode
var file = require("Storage").open("log.csv","a");

function addItem(name) {
  // The fields we want to put in out CSV file
  var csv = [
    getTime(), // Time to the nearest second
    name
  ];
  // Write data here
  file.write(csv.join(",")+"\n");
 console.log("Written");
}

setWatch(function(e) {
  console.log("Button pressed");
  addItem("Button Pressed");
}, BTN, { repeat: true, edge: 'rising', debounce: 50 });