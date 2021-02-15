/*  UbiComp Ex.3
 Submitted by Amir Thapa Magar
 Student of MSc. CS (Winter 20/21)
 Matriculation No.: 1607576

 !!Please Run This Code in Flash.
 !!RAM Doesn't support this App in IDE.
 
 Info: This contains : 
    1. Watch Face App --> Middle App
    2. Note Taking App ---> Right App
    3. Note Listing App ---> Left App 
 
    SWIPE LEFT OR RIGHT TO SWITCH APPS.
 */
//Utilities
function getImgStep() {
  const imgStep = {
    width: 35, height: 35, bpp: 8,
    transparent: 254,
    buffer: require("heatshrink").decompress(atob("/wA/AH4A/AH4A/AH4A/AF0+AAIGFELYcDFAwhXDgoidAAwheVbgiJFCYTDIRQiXDJRtUEY4kbeA4bGI6xIFaLKkPFS4kKaiZtLBIpIfEQaXYbZAiZNpAiaEg4icRTwA5"))
  };
  return imgStep;
}
function getImgCal() {
  const imgCal = {
    width: 30, height: 30, bpp: 8,
    transparent: 254,
    buffer: require("heatshrink").decompress(atob("/wA/AAXX64LVCI4SIBRQAD3YACCIPQAwYAD6ALBAwYcKy4dNy4eJDo3JDo/JDqAeB0oREBRYdKACQdjYIQAUDv4d/Dv4d/Dv4d/DtIeWDgwA/AGg"))
  };
  return imgCal;
}
//HomeView 
class HomeView {
  constructor() {
    this.clockView = new ClockView();
    this.stepView = new StepView();
    this.timeView = new TimeView();
  }
  loadView() {
    g.clear();
    this.clockView.loadView();
    this.stepView.loadView();
    this.timeView.loadView();
  }
}
//Clock View class
class ClockView {
  constructor() {
    "compiled";
  } loadView() {
    "compiled";
    this.resetDots();
    this.renderClock();
  } drawDot(angle) {
    "compiled";
    const radius = (angle % 30) ? 2.5 : 5;
    const a = angle * Math.PI / 180;
    const x = 120 + Math.sin(a) * 97;
    const y = 133 - Math.cos(a) * 97;
    g.drawCircle(x, y, radius);
    g.fillCircle(x, y, radius - 2);
  } resetDots() {
    "compiled";
    g.setColor(50 / 255, 30 / 255, 130 / 255);
    for (let i = 0; i < 60; i++) {
      this.drawDot((360 * i) / 60);
    }
  } renderClock() {
    "compiled";
    let currentSec = new Date().getSeconds();
    for (let i = 0; i < 60; i++) {
      if (i > currentSec) {
        g.setColor(50 / 255, 30 / 255, 130 / 255);
      } else if (i === currentSec) {
        g.setColor(46 / 255, 204 / 255, 113 / 255);
      } else {
        g.setColor(3 / 255, 146 / 255, 254 / 255);
      }
      this.drawDot((360 * i) / 60);
    }
  }
}
//TimeView Class
class TimeView {
  constructor() {
    "compiled";
    this.arr = this.getTime();
  }  //Load method
  loadView() {
    "compiled";
    this.renderDate();
    this.renderTime();
  }  //Render methods  
  renderDate() {
    "compiled";
    g.drawImage(getImgCal());
    g.setFont("Vector", 15);
    g.setColor(0, 0, 0);
    g.setFontAlign(0, 0);
    g.drawString(this.arr[3][2], 16, 18);
    let dateStr = this.arr[3][1] + " " + this.arr[3][3];
    g.setColor(1, 1, 1);
    g.setFont("6x8", 1);
    g.setFontAlign(-1, 1);
    g.drawString(dateStr, 32, 26);
    g.drawString(this.arr[3][0], 32, 15);
  } renderTime() {
    "compiled";
    g.setFontAlign(0, 1);
    g.setFont("Vector", 40);
    let timeStr = this.arr[0] + ":" + this.arr[1];
    g.drawString(timeStr, 122, 123);
    let timeStrWidth = g.stringWidth(timeStr);
    g.setFontAlign(-1, 1);
    g.setFont("Vector", 15);
    g.drawString(this.arr[2], 120 + timeStrWidth / 2, 118);
    g.setColor(3 / 255, 146 / 255, 254 / 255);
    g.drawLine(80, 133, 160, 133);
  }
  getTime() {
    "compiled";
    let date = new Date();
    let dateStr = date.toString().split(" ").slice(0, 4);
    var hr = date.getHours();
    var min = date.getMinutes();
    var meridian = "AM";
    hr = parseInt(hr, 10);
    if (hr == 0) {
      hr = 12;
      meridian = "AM";
    } else if (hr >= 12) {
      meridian = "PM";
      if (hr > 12) {
        hr -= 12;
      }
    }
    let hrStr = ("0" + hr).substr(-2);
    let minStr = ("0" + min).substr(-2);
    return [hrStr, minStr, meridian, dateStr];
  }
}
//StepView Class
var total = 0;
class StepView {
  constructor() {
    "compiled";
    this.goal = 50;
    this.remaining = 50;
    this.steps = 0;
  }
  loadView() {
    "compiled";
    this.steps = this.getStep();
    this.renderSteps();
    this.renderProgress();
  }
  renderSteps() {
    "compiled";
    g.drawImage(getImgStep(), 80, 141);
    g.setColor(46 / 255, 204 / 255, 113 / 255);
    g.setFont("6x8", 1);
    g.setFontAlign(-1, -1);
    g.drawString("STEPS", 115, 146);
    var str_height = g.getFontHeight();
    g.setColor(1, 1, 1);
    g.setFont("Vector", 20);
    g.drawString(this.steps, 115, 151 + str_height);
    str_height = g.getFontHeight();
    g.setColor(1, 1, 1);
    g.setFont("6x8", 1);
    g.drawString("Remaining " + this.remaining, 80, 156 + 2 * str_height);
    g.setFontAlign(0, 0);
    g.drawString("Siegen", 120, 67);
  }
  renderProgress() {
    "compiled";
    g.setColor(46 / 255, 204 / 255, 113 / 255);
    g.drawRect(70, 180, 170, 186);
    var fillWidth = 0;
    if (this.steps >= this.goal) {
      fillWidth = 96;
      g.fillRect(72, 182, 168, 184);
    } else if (this.steps == 0) {
      fillWidth = 0;
    } else {
      fillWidth = (this.steps / this.goal) * 100;
      g.fillRect(72, 182, 72 + fillWidth, 186);
    }
  }
  //Static data,
  getStep() {
    "compiled";
    let val = total;
    if (val >= this.goal) {
      this.remaining = 0;
    } else {
      this.remaining = this.goal - val;
    }
    return val;
  }
}
//ReadStep
class ReadStep {
  constructor() {
    this.csv_index = 0;
    this.len = require("Storage").read("steps.csv").split("\r\n").length;
    this.acc = new Array(3);
    this.prevPeak = 0;
  }
  readStep() {
    "compiled";
    let stepFile = require("Storage").read("steps.csv").split("\r\n").splice(this.csv_index, 1).map((x) => Number(x));
    return stepFile[0];
  }
  countStep() {
    "compiled";
    if (this.acc.length === 3) {
      this.acc.shift();
    }
    if (this.csv_index < this.len - 1) {
      this.acc.push(this.readStep());
      this.compareStep();
      this.csv_index++;
    } else {
      this.csv_index = 0;
      this.acc.length = 0;
      this.acc = new Array(3);
      total = 0;
      this.prevPeak = 0;
    }
  } compareStep() {
    "compiled";
    if (this.acc[2] != undefined) {
      if (this.acc[1] > this.acc[0] && this.acc[1] > this.acc[2]) {
        if (this.acc[1] > 3.5) {
          if (this.csv_index > this.prevPeak + 10) {
            total += 1;
            this.prevPeak = this.csv_index - 2;
          }
        }
      }
    }
  }
}
//NoteApp
var Note = "Type here!";
class NoteApp {
  constructor() {
    "compiled";
    this.resetAll();
  }
  resetAll() {
    this.note = "Type here!";
    this.file = require("Storage").open("notes.csv", "a");
    this.savingNote = false;
    this.pressTime = 0;
    this.prevPressTime = 0;
    this.releaseTime = 0;
    this.charIndex = 0;
    this.reset = true;
    this.altKeys = false;
    this.selectedKey = 1;
    this.prevSelectedKey = 0;
    this.rightKeyIndex = [4, 9, 14];
    this.COLORS = {
      NUMBER: ['#7F8183', '#A6A6A7'],
      FUNC: ['#F99D1C', '#CA7F2A'],
    };
    this.KEYS = {
      0: {
        MAIN_VAL: "1",
        SEC_VAL: [".", "?", "!"],
        ALT_VAL: [".", "?", "!"],
        COLOR: this.COLORS.NUMBER
      },
      1: {
        MAIN_VAL: "2",
        SEC_VAL: ["A", "B", "C"],
        ALT_VAL: ["a", "b", "c"],
        COLOR: this.COLORS.NUMBER
      },
      2: {
        MAIN_VAL: "3",
        SEC_VAL: ["D", "E", "F"],
        ALT_VAL: ["d", "e", "f"],
        COLOR: this.COLORS.NUMBER
      },
      3: {
        MAIN_VAL: "4",
        SEC_VAL: ["G", "H", "I"],
        ALT_VAL: ["g", "h", "i"],
        COLOR: this.COLORS.NUMBER
      },
      4: {
        MAIN_VAL: '\b',
        SEC_VAL: [],
        ALT_VAL: [],
        COLOR: this.COLORS.FUNC
      },
      5: {
        MAIN_VAL: "5",
        SEC_VAL: ["J", "K", "L"],
        ALT_VAL: ["j", "k", "l"],
        COLOR: this.COLORS.NUMBER
      },
      6: {
        MAIN_VAL: "6",
        SEC_VAL: ["M", "N", "O"],
        ALT_VAL: ["m", "n", "o"],
        COLOR: this.COLORS.NUMBER
      },
      7: {
        MAIN_VAL: "7",
        SEC_VAL: ["P", "Q", "R", "S"],
        ALT_VAL: ["p", "q", "r", "s"],
        COLOR: this.COLORS.NUMBER
      },
      8: {
        MAIN_VAL: "8",
        SEC_VAL: ["T", "U", "V"],
        ALT_VAL: ["t", "u", "v"],
        COLOR: this.COLORS.NUMBER
      },
      9: {
        MAIN_VAL: "\n",
        SEC_VAL: [],
        ALT_VAL: [],
        COLOR: this.COLORS.FUNC
      },
      10: {
        MAIN_VAL: "9",
        SEC_VAL: ["W", "X", "Y", "Z"],
        ALT_VAL: ["w", "x", "y", "z"],
        COLOR: this.COLORS.NUMBER
      },
      11: {
        MAIN_VAL: "0",
        SEC_VAL: [" "],
        ALT_VAL: [" "],
        COLOR: this.COLORS.NUMBER
      },
      12: {
        MAIN_VAL: "&",
        SEC_VAL: [";", ":", "(", ")"],
        ALT_VAL: ["[", "]", "{", "}"],
        COLOR: this.COLORS.NUMBER
      },
      13: {
        MAIN_VAL: "@",
        SEC_VAL: ["-", "_", "\\"],
        ALT_VAL: ["%", "/", "\\"],
        COLOR: this.COLORS.NUMBER
      },
      14: {
        MAIN_VAL: "abc/ABC",
        SEC_VAL: [],
        ALT_VAL: [],
        COLOR: this.COLORS.FUNC
      }
    };
  }
  getTime() {
    "compiled";
    let date = new Date();
    let dateStr = date.toString().split(" ").slice(0, 4);
    var hr = date.getHours();
    var min = date.getMinutes();
    let hrStr = ("0" + hr).substr(-2);
    let minStr = ("0" + min).substr(-2);
    return [hrStr, minStr, dateStr];
  }
  //Load view of note taking app.
  loadView() {
    "compiled";
    g.clear();
    this.initFunc();
    g.setFontAlign(-1, -1);
    g.setColor(0, 0, 0);
    g.fillRect(0, 0, 240, 120);
    g.setColor(1, 1, 1);
    g.setFont("Vector", 15);
    g.drawString(this.note, 10, 20);
    g.setColor(249 / 255, 157 / 255, 28 / 255);
    g.drawRect(5, 15, 235, 115);
  }
  //Render typed text.
  renderText(str, reset, update) {
    "compiled";
    this.note = reset ? "" : this.note;
    var tempNote = this.note;
    this.note = this.note.slice(0, update ? -2 : -1);
    if (str == "\b" && this.note.length > 0) {
      this.note = this.note.slice(0, -1);
    } else if (str !== "\b") {
      if (str === "\n") {
        if (this.note.slice(-1)[0] === "\n") {
          return;
        }
      }
      this.note = reset ? str : this.note + str;
      let arrSent = this.note.split("\n");
      let lastSent = arrSent.slice(-1)[0];
      let tempWords = lastSent.split(" ");
      let lastWord = tempWords.slice(-1)[0];
      let lastWordWidth = g.stringWidth(lastWord);
      let lastSentWidth = g.stringWidth(lastSent);
      if (lastSentWidth > 140) {
        this.note = arrSent.slice(0, -1).join("\n");
        this.note += (this.note.length > 5) ? "\n" : "";
        this.note += tempWords.slice(0, -1).join(" ") + "\n";
        this.note += tempWords.slice(-1)[0];
      }
    } this.note += "_";
    let textHeight = g.getFontHeight() * this.note.split("\n").length;
    if (textHeight > 60) {
      this.note = tempNote;
      return;
    }
    g.setFontAlign(-1, -1);
    g.setColor(0, 0, 0);
    g.fillRect(0, 0, 240, 120);
    g.setColor(249 / 255, 157 / 255, 28 / 255);
    g.drawRect(5, 15, 235, 115);
    g.setColor(1, 1, 1);
    g.setFont("Vector", 15);
    Note = this.note.slice(0, -1);
    g.drawString(this.note, 10, 20);
  }
  //Show dialog for note.
  showDialog(isSave) {
    "compiled";
    g.setColor(0, 0, 0);
    g.fillRect(0, 0, 240, 120);
    g.setColor(0, 0, 0);
    g.fillRect(20, 30, 220, 100);
    g.setColor(1, 1, 1);
    g.drawRect(20, 30, 220, 100);
    g.drawRect(22, 32, 218, 98);
    g.setFontAlign(0, 0);
    g.setFont("Vector", 20); if (isSave) {
      g.setColor(249 / 255, 157 / 255, 28 / 255);
    } else {
      g.setColor(244 / 255, 54 / 255, 59 / 255);
    }
    g.drawString(isSave ? "Saving..." : "Cancelling...", 120, 60);
  }
  //Save note to csv.
  saveNote() {
    "compiled";
    this.savingNote = true;
    Note = Note.trim();
    if (Note == "Type here!" || Note.length == 0) {
      this.showDialog(false);
    } else {
      Note = Note.replace("\n", "*0L");
      let strTime = this.getTime();
      let time = strTime[0] + ":" + strTime[1];
      let date = strTime[2].join(" ");
      var csv = [
        Note,
        time,
        date
      ];
      // Write data here
      this.file.write(csv.join(",") + "\n");
      this.showDialog(true);
    }
    Note = "Type here!";
  }
  //Draw single key.
  drawKey(key, area, center) {
    "compiled";
    let tempSelected = (key == this.selectedKey);
    let value = this.KEYS[key];
    g.setColor(value.COLOR[tempSelected ? 1 : 0]);
    g.fillRect(area[0], area[1], area[2], area[3]);
    g.setColor(1, 1, 1);
    g.setFont("6x8", 1);
    switch (key) {
      case 4: g.fillPoly([area[0] + 20, area[1] + 10, area[0] + 5, area[1] + 16, area[0] + 20, area[1] + 22]);
        g.fillRect(area[0] + 20, area[1] + 15, area[0] + 40, area[1] + 17);
        break;
      case 9: g.fillPoly([area[0] + 20, area[1] + 15, area[0] + 5, area[1] + 21, area[0] + 20, area[1] + 27]);
        g.fillRect(area[0] + 20, area[1] + 20, area[0] + 42, area[1] + 22);
        g.fillRect(area[0] + 40, area[1] + 10, area[0] + 42, area[1] + 20);
        break;
      case 14:
        g.setFontAlign(0, 0);
        g.drawString(value.MAIN_VAL, center[0], center[1]);
        break;
      case 11:
        g.fillRect(area[0] + 8, area[1] + 17, area[0] + 10, area[1] + 27);
        g.fillRect(area[0] + 8, area[1] + 25, area[0] + 38, area[1] + 27);
        g.fillRect(area[0] + 38, area[1] + 17, area[0] + 40, area[1] + 27);
        g.setFontAlign(0, -1);
        g.setFont("Vector", 12);
        g.drawString(value.MAIN_VAL, center[0], area[1] + 5);
        break;
      default:
        g.setFontAlign(0, -1);
        g.setFont("6x8", 1);
        g.drawString(value.MAIN_VAL, center[0], area[1] + 5);
        g.setFontAlign(0, 1);
        let secStr = this.altKeys ? value.ALT_VAL.join("") : value.SEC_VAL.join("");
        g.drawString(secStr, center[0], area[3] - 10);
    }
  }
  //Moving key press.
  moveIndex(d) {
    "compiled";
    switch (d) {
      case "U": {
        if (this.selectedKey > 4) {
          this.prevSelectedKey = this.selectedKey;
          this.selectedKey -= 5;
        }
        break;
      }
      case "D": {
        if (this.selectedKey < 10) {
          this.prevSelectedKey = this.selectedKey;
          this.selectedKey += 5;
        }
        break;
      }
      case "L": {
        if (this.selectedKey % 5 != 0) {
          this.prevSelectedKey = this.selectedKey;
          this.selectedKey -= 1;
        }
        break;
      }
      case "R": {
        if (!this.rightKeyIndex.includes(this.selectedKey)) {
          this.prevSelectedKey = this.selectedKey;
          this.selectedKey += 1;
        }
        break;
      }
      case "=": {
        var str = "";
        var item = this.KEYS[this.selectedKey];
        var itemIndex = 0;
        var chars = [];
        var update = false;
        if (!this.rightKeyIndex.includes(this.selectedKey)) {
          if (this.altKeys) {
            itemIndex = this.charIndex % item.ALT_VAL.length;
            chars = item.ALT_VAL;
          } else {
            itemIndex = this.charIndex % item.SEC_VAL.length;
            chars = item.SEC_VAL;
          }
          str = chars[itemIndex];
        } else {
          str = item.MAIN_VAL;
        } if (itemIndex > 0) {
          update = true;
        } if (str === "abc/ABC") {
          this.altKeys = !this.altKeys;
        } else {
          this.renderText(str, this.reset, update);
          this.reset = false;
        }
        break;
      }
      case "NUM": {
        let str = this.KEYS[this.selectedKey].MAIN_VAL;
        this.renderText(str, this.reset);
        break;
      }
      default:
        break;
    }
    this.drawKeys();
  }
  //Action to BTN2 press
  listenBTN2(press) {
    "compiled";
    if (press === true) {
      this.prevPressTime = this.pressTime;
      digitalWrite(LED2, 1);
      this.pressTime = new Date();
    }
  }
  //Action to BTN2 release 
  //Calculate keypad press speed.
  pressCount() {
    "compiled";
    digitalWrite(LED2, 0);
    this.releaseTime = new Date();
    let diff = this.releaseTime - this.pressTime;
    if (diff >= 400) {
      this.moveIndex("NUM");
      this.pressTime = 0;
      this.releaseTime = 0;
      this.charIndex = 0;
      this.prevPressTime = 0;
    } else {
      let diffPress = this.pressTime - this.prevPressTime;
      this.charIndex = (diffPress < 400) ? this.charIndex + 1 : 0;
      this.moveIndex("=");
    }
  }
  //Init method
  initFunc() {
    "compiled";
    g.clear();
    // listen to BTN2 press
    setWatch(_ => this.listenBTN2(true), BTN2, { repeat: true, edge: 'rising' });
    // listen to BTN2 release
    setWatch(_ => this.pressCount(), BTN2, { repeat: true, edge: 'falling' });    // listen to BTN5 button release
    setWatch(_ => this.moveIndex("R"), BTN5, { repeat: true, edge: 'falling' });
    // listen to BTN4 button release
    setWatch(_ => this.moveIndex("L"), BTN4, { repeat: true, edge: 'falling' }); setWatch(_ => this.moveIndex("U"), BTN1, { repeat: true });
    setWatch(_ => this.moveIndex("D"), BTN3, { repeat: true });
    this.drawKeys();
  }
  //Method to draw keypad.
  drawKeys() {
    "compiled";
    for (var k in this.KEYS) {
      let x1 = 48 * (k % 5);
      let x2 = x1 + 48;
      let y1 = 120 + 40 * (parseInt(k / 5));
      let y2 = y1 + 40;
      let area = [x1, y1, x2, y2];
      let center = [(x1 + x2) / 2, (y1 + y2) / 2];
      this.drawKey(k, area, center);
    }
  }
}
//NoteList
class NoteViewer {
  constructor() {
    "compiled";
    this.f = require("Storage").open("notes.csv", "r");
    this.selectedNote = 0;
    this.notes = [];
    this.prompt = false;
  }
  readNotes() {
    "compiled";
    this.f = require("Storage").open("notes.csv", "r");
    this.selectedNote = 0;
    this.prompt = false;
    l = " ";
    while (l !== undefined) {
      l = this.f.readLine();
      if (l === undefined) {
        break;
      }
      let str = this.format(l);
      this.notes.push(str);
    }
    this.showNote();
    this.listenBtn();
  }
  format(val) {
    "compiled";
    let arr = String(val).split(",");
    return arr;
  }
  showNote() {
    "compiled";
    let index = this.selectedNote;
    var note;
    var time = "";
    var date = "";
    var msg = "Notes Not Available.";
    if (this.notes.length > 0) {
      note = this.notes[index];
      time = note[1];
      date = note[2];
      msg = note[0].replace("*0L", "\n");
    }
    g.setColor(1, 1, 1);
    g.fillRect(0, 0, 240, 240);
    g.setColor(249 / 255, 157 / 255, 28 / 255);
    g.drawRect(10, 10, 230, 230);
    g.setFont("Vector", 12);
    g.setFontAlign(1, 1);
    g.setColor(249 / 255, 156 / 255, 57 / 255);
    g.drawString(date, 220, 25);
    g.drawString(time, 220, 43);

    if (note != undefined) {
      g.setFontAlign(-1, -1);
      g.setColor(0, 0, 0);
      g.setFont("Vector", 14);
      g.drawString("U", 233, 20);
      g.drawString("D", 233, 200);
      g.drawString(msg, 20, 50);
      g.setColor(127 / 255, 129 / 255, 131 / 255);
      g.fillRect(60, 190, 180, 220);
      g.setColor(249 / 255, 156 / 255, 57 / 255);
      g.drawRect(60, 190, 180, 220);
      g.drawRect(58, 188, 178, 218);
      g.setColor(249 / 255, 157 / 255, 28 / 255);
      g.setFontAlign(0, 0);
      g.drawString("Delete", 120, 205);
      g.setColor(127 / 255, 129 / 255, 131 / 255);
      g.drawPoly([232, 120, 240, 120, 236, 117, 240, 120, 236, 123], false);
    } else {
      g.setColor(0, 0, 0);
      g.fillRect(30, 80, 210, 160);
      g.setColor(249 / 255, 157 / 255, 28 / 255);
      g.drawRect(32, 82, 208, 158);
      g.setFont("Vector", 15);
      g.setFontAlign(0, 0);
      g.setColor(1, 1, 1);
      g.drawString(msg, 120, 120);
    }
  }
  listenBtn() {
    "compiled";
    setWatch(_ => this.updateIndex("U"), BTN1, { repeat: true });
    setWatch(_ => this.updateIndex("D"), BTN3, { repeat: true });
    setWatch(_ => this.updateIndex("M"), BTN2, { repeat: true });
    setWatch(_ => this.goBack(), BTN5, { repeat: true });
    setWatch(_ => this.updateIndex("X"), BTN4, { repeat: true });
  }
  updateIndex(val) {
    "compiled";
    if (this.notes.length > 0) {
      switch (val) {
        case "U":
          if (this.selectedNote > 0 && !this.prompt) {
            this.selectedNote--;
            this.showNote();
          }
          break;
        case "D":
          if (this.selectedNote < (this.notes.length - 1) && !this.prompt) {
            this.selectedNote++;
            this.showNote();
          }
          break;
        case "M":
          if (!this.prompt) {
            this.showPrompt();
          }
          break;
        case "X":
          if (this.prompt) {
            this.deleteItem();
          }
          break;
        default:
          break;
      }
    }
  }
  showPrompt() {
    this.prompt = true;
    g.setColor(0, 0, 0);
    g.fillRect(30, 80, 210, 160);
    g.setColor(249 / 255, 157 / 255, 28 / 255);
    g.drawRect(32, 82, 208, 158);
    g.setFont("Vector", 18);
    g.setFontAlign(0, 0);
    g.setColor(1, 1, 1);
    g.drawString("Delete Note?", 120, 100);
    g.setFont("Vector", 14);
    g.drawString("Ok", 80, 132);
    g.drawString("Cancel", 160, 130);
    g.drawRect(50, 120, 110, 140);
    g.drawRect(130, 120, 190, 140);
  }
  goBack() {
    if (this.prompt) {
      this.prompt = false;
      this.showNote();
    }
  }
  deleteItem() {
    let i = this.selectedNote;
    this.notes.splice(i, 1);
    this.removeNote(i);
    this.notes = [];
    this.readNotes();
  }
  removeNote(index) {
    this.f.erase();
    this.f = require("Storage").open("notes.csv", "a");
    var i = 0;
    for (i = 0; i < this.notes.length; i++) {
      var items = this.notes[i];
      let n = items[0];
      let t = items[1];
      var d = items[2];
      d = d.replace("\n", "");
      let csv = [n, t, d].join(",");
      this.f.write(csv + "\n");
    }
  }
}
//Global Views
var homeView = new HomeView();
var readStep = new ReadStep();
var noteApp, noteList;
var saving = false;
function loadHome() {
  saving = false;
  homeView = new HomeView();
  homeView.loadView();
  noteApp = null;
  noteList = null;
}
function loadNote() {
  noteApp = new NoteApp();
  noteApp.loadView();
}
function loadNoteList() {
  noteList = new NoteViewer();
  noteList.readNotes();
}
function bootApp() {
  if (appIndex === 1) {
    if (prevAppIndex == 2) {
      if (!saving) {
        homeView.loadView();
      }
    } else {
      homeView.loadView();
    }
  }
  readStep.countStep();
}
//Entry Point
startTimers = () => {
  timer = setInterval(bootApp, 100);
}();
//Listen swipe
var appIndex = 1;
var prevAppIndex = 0;
Bangle.on('swipe', (sDir) => {
  let prevIndex = appIndex;
  if (sDir == 1) {
    if (appIndex > 0) {
      prevAppIndex = appIndex;
      appIndex--;
    }
  } else {
    if (appIndex < 2) {
      prevAppIndex = appIndex;
      appIndex++;
    }
  }
  if (prevIndex !== appIndex) {
    switch (appIndex) {
      case 0:
        setTimeout(loadNoteList, 400);
        break;
      case 1:
        E.showMenu();
        clearWatch();
        if (prevAppIndex == 2) {
          saving = true;
          noteApp.saveNote(this);
        }
        setTimeout(loadHome, 400);
        break;
      case 2:
        homeView = null;
        setTimeout(loadNote, 400);
        break;
      default:
        break;
    }
  }
});