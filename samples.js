
//Espruino Some sample Codes only.

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



// Wire up up MOSI, MISO, SCK and CS pins (along with 3.3v and GND)
SPI1.setup({mosi:A7, miso:A6, sck:A5});
E.connectSDCard(SPI1, B1 /*CS*/);
// see what's on the device
console.log(require("fs").readdirSync());


function onInit() {
  // initialise SPI1 for SDCard module
  SPI1.setup({sck:A5, miso:A6, mosi:A7 });
  E.connectSDCard(SPI1,B5 /*CS*/);
  console.log(require("fs").readdirSync());
  // ...
}


var f = E.openFile("data.csv","a");

setInterval(function() {
  var readings = [
    getTime(),
    analogRead(B1)
  ];
  f.write(readings.join(", ")+"\n");
}, 100);