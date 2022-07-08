/* 
SD Card functions defined:
1. Initialize SD Card: initSDCard()
2. Unmount SD Card before removing: unMountSDCard()
3. List files in root directory of SD Card: listFiles()
4. Write a text to a text file: writeToFile()
5. Read a text file from a SD Card:readFile()
*/

// Initializes SD Card
function initSDCard() {
    // Set CS pin of SD Card low
    digitalWrite(B5, 1);
    digitalPulse(LED1, 1, 50); // Pulse LED for SD Card operation
    console.log("Connecting SD Card...");

    // Wire up up MOSI, MISO, SCK and CS pins (along with 3.3v and GND)
    SPI1.setup({ mosi: A7, miso: A6, sck: A5 });
    //Connect SDCard
    E.connectSDCard(SPI1, B5 /*CS*/);
}

// Unmouts the SD Card.
// Hint: Before removing SD Card call this function for safety issue.
function unMountSDCard() {
    E.unmountSD(); // card can now be pulled out
    digitalWrite(LED1, 0); // red indicator off
}

//List files from root directory
function listFiles(path = "") {
    digitalPulse(LED1, 1, 50); // Pulse LED for SD Card operation
    console.log("Listing Files of SD Card...");
    var files = require("fs").readdirSync(path);
    for (var i in files)
        console.log("Found file " + files[i]);
    console.log("File Listing completed...");
    digitalWrite(LED1, 0); // SD Card operation indicator off
}

//Write to file and store in SD Card
function writeToFile(name = "log.txt", txt = "Test text...") {
    digitalPulse(LED1, 1, 50); // Pulse LED for SD Card operation
    console.log("Write File " + name + "...");
    //Open new file in append mode
    var f = E.openFile(name, "a");
    f.write(txt);
    f.close();
    console.log("Write Operation Completed..");
    digitalWrite(LED1, 0); // SD Card operation indicator off
}

//Read a file from SD Card
function readFile(name = "log.txt") {
    digitalPulse(LED1, 1, 50); // Pulse LED for SD Card operation
    console.log("Reading " + name + "...");
    f = E.openFile("log.txt", "r");
    f.pipe(console.log);
    f.close();
    console.log("Read operation completed.");
    digitalWrite(LED1, 0); // SD Card operation indicator off
}


//Initialize SD Card
initSDCard();

// List files After few seconds
setTimeout(listFiles, 2000);

// Write to a file after few seconds
setTimeout(writeToFile, 1000);

//Read a file after few seconds
setTimeout(readFile, 1000);

//Unmount SD Card
setTimeout(unMountSDCard, 1000);