/*  UbiComp Ex. 2
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

//Required
require("Font8x16").add(Graphics);

//Global Constants
var Note = "Type here!";
const InfoType = "Type here!";
const locale = require('locale');
const imgStep = {
  width: 35, height: 35, bpp: 8,
  transparent: 254,
  buffer: require("heatshrink").decompress(atob("/wA/AH4A/AH4A/AH4A/AF0+AAIGFELYcDFAwhXDgoidAAwheVbgiJFCYTDIRQiXDJRtUEY4kbeA4bGI6xIFaLKkPFS4kKaiZtLBIpIfEQaXYbZAiZNpAiaEg4icRTwA5"))
};
const imgCal = {
  width: 30, height: 30, bpp: 8,
  transparent: 254,
  buffer: require("heatshrink").decompress(atob("/wA/AAXX64LVCI4SIBRQAD3YACCIPQAwYAD6ALBAwYcKy4dNy4eJDo3JDo/JDqAeB0oREBRYdKACQdjYIQAUDv4d/Dv4d/Dv4d/DtIeWDgwA/AGg"))
};

const imgEnt = {
  width: 30, height: 30, bpp: 8,
  transparent: 0,
  buffer: require("heatshrink").decompress(atob("AFf/ABYcQFJocaDyBLPDv4d/BpoHPDvD1BAA4dSRZ4dMDiIdyExIdSIZQdRDhYdQDiYdIeRL1JHZa6SO5bZVQRAeRd6odTLKoeYDIgeXC4zsMe6YAXA="))
};

const imgBks = {
  width: 30, height: 30, bpp: 8,
  transparent: 0,
  buffer: require("heatshrink").decompress(atob("AH4A/AHX/ACgcIGSocaC4QFKDqwcXDAgcJJJ4JCOhQKEB5aRNBgQPLahIPTDrxZdSrzReBxYAOFp4dUDywWGDyoVIc4QASR64A/AH4Ac"))
};

const imgSpace = {
  width: 30, height: 30, bpp: 8,
  transparent: 254,
  buffer: require("heatshrink").decompress(atob("/wA/AH4A/AH4A/ABfX64VaAwIdWCwgd/DrgAWDsIeYf6oA/AH4A/AH4A2A=="))
};

//Global Var
var timer, noteApp;
var apps = [0, 1, 2];
var appIndex = 1;
var prevAppIndex = 1;

//LCD Attributes class
class LCDAttr {
  static get widgetHeight() {
    return 13;
  }

  static get height() {
    return g.getHeight();
  }

  static get width() {
    return g.getWidth();
  }

  static get centerY() {
    return this.height / 2 + this.widgetHeight;
  }

  static get centerX() {
    return this.width / 2;
  }

  static get center() {
    return [this.centerX, this.centerY];
  }
}

//UIColors 
class UIColors {
  static white() {
    g.setColor(1, 1, 1);
  }

  static black() {
    g.setColor(0, 0, 0);
  }

  static paper() {
    g.setColor(127 / 255, 129 / 255, 131 / 255);
  }

  static paperWhite() {
    g.setColor(166 / 255, 166 / 255, 167 / 255);
  }

  static sun() {
    g.setColor(249 / 255, 157 / 255, 28 / 255);
  }

  static sunDark() {
    g.setColor(202 / 255, 127 / 255, 42 / 255);
  }
  static blue() {
    g.setColor(3 / 255, 146 / 255, 254 / 255);
  }

  static red() {
    g.setColor(244 / 255, 54 / 255, 59 / 255);
  }

  static green() {
    g.setColor(46 / 255, 204 / 255, 113 / 255);
  }

  static primary() {
    g.setColor(50 / 255, 30 / 255, 130 / 255);
  }

  static tint() {
    g.setColor(249 / 255, 156 / 255, 57 / 255);
  }

}

//UIFonts
class UIFonts {
  static set6X8(size) {
    g.setFont("6x8", size);
  }

  static setVector(size) {
    g.setFont("Vector", size);
  }

  static setFont8x16() {
    g.setFont8x16();
  }

  static alignCenter() {
    g.setFontAlign(0, 0);
  }
  static alignLeftCenter() {
    g.setFontAlign(-1, 0);
  }
  static alignRightCenter() {
    g.setFontAlign(1, 0);
  }
  static alignRightTop() {
    g.setFontAlign(1, -1);
  }
  static alignLeftTop() {
    g.setFontAlign(-1, -1);
  }
  static alignRightBottom() {
    g.setFontAlign(1, 1);
  }
  static alignLeftBottom() {
    g.setFontAlign(-1, 1);
  }
  static alignCenterTop() {
    g.setFontAlign(0, -1);
  }
  static alignCenterBottom() {
    g.setFontAlign(0, 1);
  }
}


//Clock View class
class ClockView {

  constructor() {
    this.pRad = Math.PI / 180;
    this.faceRad = 97;
  }

  loadView() {
    this.resetDots();
    this.renderClock();
  }

  drawDot(angle) {
    //Large dot in each 30 degrees
    const radius = (angle % 30) ? 2.5 : 5;
    const a = angle * this.pRad;
    const x = LCDAttr.centerX + Math.sin(a) * this.faceRad;
    const y = LCDAttr.centerY - Math.cos(a) * this.faceRad;
    g.drawCircle(x, y, radius);
    g.fillCircle(x, y, radius - 2);
  }

  resetDots() {
    UIColors.primary();
    for (let i = 0; i < 60; i++) {
      this.drawDot((360 * i) / 60);
    }
  }

  renderClock() {
    let currentDate = new Date();
    const currentSec = currentDate.getSeconds();
    for (let i = 0; i < 60; i++) {
      if (i > currentSec) {
        UIColors.primary();
      } else if (i === currentSec) {
        UIColors.green();
      } else {
        UIColors.blue();
      }
      this.drawDot((360 * i) / 60);
    }
  }
}

//TimeView Class
class TimeView {
  constructor() {
    this.margin = 5;
    this.pad = 1;
    this.lineWidth = 40;
  }

  //Load method
  loadView() {
    this.renderDate();
    this.renderTime();
  }

  //Render methods
  renderDate() {
    let date = this.getTime()[3];
    UIFonts.setVector(15);
    UIColors.black();
    UIFonts.alignCenter();
    g.drawString(date[1], imgCal.width / 2 + this.pad, imgCal.height / 2 + 3);
    let dateStr = date[0] + " " + date[2];
    UIColors.white();
    UIFonts.set6X8(1);
    UIFonts.alignLeftBottom();
    g.drawString(dateStr, imgCal.width + 2, imgCal.height - this.margin + this.pad);
    UIFonts.alignLeftBottom();
    UIFonts.set6X8(1);
    g.drawString(date[3], imgCal.width + 2, imgCal.height / 2);
  }

  renderTime() {
    let arr = this.getTime();
    UIFonts.alignCenterBottom();
    UIFonts.setVector(40);
    let timeStr = arr[0] + ":" + arr[1];
    g.drawString(timeStr, LCDAttr.centerX + 2, LCDAttr.centerY - (2 * this.margin));
    let timeStrWidth = g.stringWidth(timeStr);
    UIFonts.alignLeftBottom();
    UIFonts.setVector(15);
    g.drawString(arr[2], LCDAttr.centerX + timeStrWidth / 2, LCDAttr.centerY - 15);
    UIColors.blue();
    g.drawLine(LCDAttr.centerX - this.lineWidth, LCDAttr.centerY, LCDAttr.centerX + this.lineWidth, LCDAttr.centerY);
  }

  //Utilities
  getTime() {
    let date = new Date();
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
    var dateStr = locale.date(date).split(" ");
    dateStr.push(locale.dow(date, 1));
    return [hrStr, minStr, meridian, dateStr];
  }

}

//StepView Class
class StepView {
  constructor() {
    this.iconHeight = imgStep.height;
    this.iconWidth = imgStep.width;
    this.goal = 10000;
    this.remaining = 10000;
    this.steps = 0;
  }

  loadView() {
    this.steps = this.getStep();
    this.renderSteps();
    this.renderProgress();
  }

  renderSteps() {
    let icon_x = LCDAttr.centerX - 40;
    let icon_y = LCDAttr.centerY + 8;
    g.drawImage(imgStep, icon_x, icon_y);
    UIColors.green();
    UIFonts.set6X8(1);
    UIFonts.alignLeftTop();
    g.drawString("STEPS", icon_x + this.iconWidth, icon_y + 5);
    var str_height = g.getFontHeight();
    UIColors.white();
    //UIFonts.setTeleText();
    UIFonts.setVector(20);
    g.drawString(this.steps, icon_x + this.iconWidth, icon_y + str_height + 10);

    str_height = g.getFontHeight();
    UIColors.white();
    UIFonts.set6X8(1);
    g.drawString("Remaining " + this.remaining, icon_x, icon_y + 2 * str_height + 15);
    UIFonts.alignCenter();
    g.drawString("Siegen", LCDAttr.centerX, 67);
  }

  renderProgress() {
    let boxWidth = 100;
    let boxheight = 6;
    let x = LCDAttr.centerX - boxWidth / 2;
    let y = LCDAttr.height - 60;
    UIColors.green();
    g.drawRect(x, y, x + boxWidth, y + boxheight);
    var fillWidth = 0;
    if (this.steps >= this.goal) {
      fillWidth = boxWidth - 4;
    } else {
      fillWidth = (this.steps / this.goal) * boxWidth;
    }
    UIColors.green();
    g.fillRect(x + 2, y + 2, x + 1 + fillWidth, y + boxheight - 2);
  }

  //Static data,
  //To do : Use acceleration functions.
  getStep() {
    let val = 7576;
    if (val >= this.goal) {
      this.remaining = 0;
    } else {
      this.remaining = this.goal - val;
    }
    return val;
  }
}


/* 
  Note Taking App
  AppIndex = 2
  Swipe right to open.
  Swipe left to close.
  Instantiates Keyboard
*/
class NoteApp {
  constructor() {
    this.note = InfoType;
    this.keyboard = new Keyboard(this.renderText);
    this.file = require("Storage").open("notes.csv", "a");
    this.noteDate = new TimeView().getTime();
  }

  //Load view of note taking app.
  loadView() {
    g.clear();
    this.keyboard.initFunc();
    UIFonts.alignLeftTop();
    UIColors.black();
    g.fillRect(0, 0, LCDAttr.width, 120);
    UIColors.white();
    UIFonts.setVector(15);
    g.drawString(this.note, 10, 20);
    UIColors.sun();
    g.drawRect(5, 15, LCDAttr.width - 5, 120 - 5);
  }

  //Render typed text.
  renderText(str, reset, update) {
    this.note = reset ? "" : this.note;
    var tempNote = this.note;
    this.note = this.note.slice(0, update ? -2 : -1);
    if (str == "\b" && this.note.length > 1) {
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
    }

    this.note += "_";
    let textHeight = g.getFontHeight() * this.note.split("\n").length;
    if (textHeight > 60) {
      this.note = tempNote;
      return;
    }
    UIFonts.alignLeftTop();
    UIColors.black();
    g.fillRect(0, 0, LCDAttr.width, 120);
    UIColors.sun();
    g.drawRect(5, 15, LCDAttr.width - 5, 120 - 5);
    UIColors.white();
    UIFonts.setVector(15);
    Note = this.note.slice(0, -1);
    g.drawString(this.note, 10, 20);
  }

  //Show dialog for note.
  showDialog(isSave) {
    UIColors.black();
    g.fillRect(0, 0, LCDAttr.width, 120);
    UIColors.black();
    g.fillRect(20, 30, 220, 100);
    UIColors.white();
    g.drawRect(20, 30, 220, 100);
    g.drawRect(22, 32, 218, 98);
    UIFonts.alignCenter();
    UIFonts.setVector(20);

    if (isSave) {
      UIColors.sun();
    } else {
      UIColors.red();
    }
    g.drawString(isSave ? "Saving..." : "Cancelling...", 120, 60);
  }

  //Save note to csv.
  saveNote() {
    this.savingNote = true;
    Note = Note.trim();
    if (Note == InfoType || Note.length == 0) {
      this.showDialog(false);
    } else {
      Note = Note.replace("\n", "*0L");
      //[hrStr, minStr, meridian, dateStr]
      let time = this.noteDate[0] + ":" + this.noteDate[1] + this.noteDate[2];
      let date = this.noteDate[3].join(" ");
      var csv = [
        Note,
        time,
        date
      ];
      // Write data here
      this.file.write(csv.join(",") + "\n");
      this.showDialog(true);
    }
    Note = InfoType;
  }
}

/*
  Keyboard class 
  Keyboard views and Functions
*/

class Keyboard {

  constructor(callback) {
    this.savingNote = false;
    this.pressTime = 0;
    this.prevPressTime = 0;
    this.releaseTime = 0;
    this.charIndex = 0;
    this.reset = true;
    this.callback = callback;
    this.enter = "ENT";
    this.backsapce = "BKS";
    this.space = "SPC";
    this.altKeys = false;
    this.selectedKey = 1;
    this.prevSelectedKey = 0;
    this.rightKeyIndex = [4, 9, 14];
    this.COLORS = {
      NUMBER: ['#7F8183', '#A6A6A7'],
      FUNC: ['#F99D1C', '#CA7F2A'],
    };
    this.KBD_HEIGHT = LCDAttr.height / 2;
    this.KBD_WIDTH = LCDAttr.width;
    this.KEY_HEIGHT = this.KBD_HEIGHT / 3;
    this.KEY_WIDTH = this.KBD_WIDTH / 5;
    this.KEYS = {
      0: {
        MAIN_VAL: "1",
        SEC_VAL: [".", ",", "?", "!"],
        ALT_VAL: [".", ",", "?", "!"],
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
        ALT_VAL: ["%", "/"],
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

  //Draw single key.
  drawKey(key, area, center) {
    let tempSelected = (key == this.selectedKey);
    let value = this.KEYS[key];
    g.setColor(value.COLOR[tempSelected ? 1 : 0]);
    g.fillRect(area[0], area[1], area[2], area[3]);
    UIColors.white();
    UIFonts.set6X8(1);
    switch (key) {
      case 4:
        g.drawImage(imgBks, area[0] + 10, area[1] + 5);
        break;
      case 9:
        g.drawImage(imgEnt, area[0] + 10, area[1] + 5);
        break;
      case 14:
        UIFonts.alignCenter();
        g.drawString(value.MAIN_VAL, center[0], center[1]);
        break;
      case 11:
        g.drawImage(imgSpace, area[0] + 9, area[1] + 5);
        UIFonts.alignCenterTop();
        UIFonts.setVector(12);
        g.drawString(value.MAIN_VAL, center[0], area[1] + 5);
        break;
      default:
        UIFonts.alignCenterTop();
        UIFonts.setFont8x16();
        g.drawString(value.MAIN_VAL, center[0], area[1] + 5);
        UIFonts.alignCenterBottom();
        UIFonts.set6X8(1);
        let secStr = this.altKeys ? value.ALT_VAL.join("") : value.SEC_VAL.join("");
        g.drawString(secStr, center[0], area[3] - 10);
    }
  }

  //Moving key press.
  moveIndex(d) {
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
        }

        if (itemIndex > 0) {
          update = true;
        }

        if (str === "abc/ABC") {
          this.altKeys = !this.altKeys;
        } else {
          this.callback(str, this.reset, update);
          this.reset = false;
        }
        break;
      }
      case "NUM": {
        let str = this.KEYS[this.selectedKey].MAIN_VAL;
        this.callback(str, this.reset);
        break;
      }
      default:
        break;
    }
    this.drawKeys();
  }

  //Action to BTN2 press
  listenBTN2(press) {
    if (press === true) {
      this.prevPressTime = this.pressTime;
      digitalWrite(LED2, 1);
      this.pressTime = new Date();
    }
  }

  //Action to BTN2 release 
  //Calculate keypad press speed.
  pressCount() {
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
    g.clear();
    // listen to BTN2 press
    setWatch(_ => this.listenBTN2(true), BTN2, { repeat: true, edge: 'rising' });
    // listen to BTN2 release
    setWatch(_ => this.pressCount(), BTN2, { repeat: true, edge: 'falling' });

    // listen to BTN5 button release
    setWatch(_ => this.moveIndex("R"), BTN5, { repeat: true, edge: 'falling' });
    // listen to BTN4 button release
    setWatch(_ => this.moveIndex("L"), BTN4, { repeat: true, edge: 'falling' });

    setWatch(_ => this.moveIndex("U"), BTN1, { repeat: true });
    setWatch(_ => this.moveIndex("D"), BTN3, { repeat: true });
    this.drawKeys();
  }

  //Method to draw keypad.
  drawKeys() {
    for (var k in this.KEYS) {
      let x1 = this.KEY_WIDTH * (k % 5);
      let x2 = x1 + this.KEY_WIDTH;
      let y1 = this.KBD_HEIGHT + this.KEY_HEIGHT * (parseInt(k / 5));
      let y2 = y1 + this.KEY_HEIGHT;
      let area = [x1, y1, x2, y2];
      let center = [(x1 + x2) / 2, (y1 + y2) / 2];
      this.drawKey(k, area, center);
    }
  }
}

/*
//NotepadList App Functions
//AppIndex = 0
//App to show notes details.
*/
//Global vars
var notesList = {};
var subMenu = {};
var notes = [];
var selectedNote = 0;
var f = require("Storage").open("notes.csv", "r");
var l = "";

//Init func
function initNoteList() {
  //load note list
  notesList = {};
  subMenu = {};
  notes = [];
  selectedNote = 0;
  l = "";
  f = require("Storage").open("notes.csv", "r");
  readNotes();
}

//Read notes from CSV
function readNotes() {
  notes = [];
  l = " ";

  while (l !== undefined) {
    l = f.readLine();
    if (l === undefined) {
      break;
    }
    let str = String(l);
    notes.push(str);
  }
  showList(notes);
}

//Show Note List.
function showList(n) {
  notesList = {
    "": { title: "Notes List" }
  };
  var i = 0;
  for (i = 0; i < n.length; i++) {
    let item = n[i];
    let strArr = String(item).split(",");
    let t = strArr[0].replace("*0L", " ").slice(0, 7);
    notesList[i + 1 + "." + t] = viewNote.bind(this, i);
  }
  if (notes.length == 0) {
    notesList.Empty = function () { };
  }
  E.showMenu(notesList);
}

//Draw Note Detail.
function viewNote(index) {
  E.showMenu();
  selectedNote = index;
  let note = notes[index];
  let strArr = note.split(",");
  let data = strArr;
  let time = data[1];
  let date = data[2];
  let msg = data[0].replace("*0L", "\n");
  UIColors.white();
  g.fillRect(0, 0, 240, 240);
  UIColors.sun();
  g.drawRect(10, 10, 230, 230);
  UIFonts.setVector(12);
  UIFonts.alignRightBottom();
  UIColors.tint();
  g.drawString(date, 220, 25);
  g.drawString(time, 220, 43);
  UIFonts.alignLeftTop();
  UIColors.black();
  UIFonts.setVector(15);
  g.drawString(msg, 20, 50);
  UIColors.paper();
  g.fillRect(60, 190, 180, 220);
  UIColors.tint();
  g.drawRect(60, 190, 180, 220);
  g.drawRect(58, 188, 178, 218);
  UIColors.sun();
  UIFonts.alignCenter();
  g.drawString("Delete", 120, 205);
  UIColors.paper(); g.drawPoly([232, 120, 240, 120, 236, 117, 240, 120, 236, 123], false);
  this.listenBtn();
}

//Listen to btn.
function listenBtn() {
  setWatch(showPrompt, BTN2, { 'repeat': true });
  setWatch(goBack, BTN1, { 'repeat': false });
}

//Prompt to delete note.
function showPrompt() {
  E.showPrompt("Delete Note?").then(function (v) {
    if (v) {
      deleteItem(selectedNote);
    } else {
      viewNote(selectedNote);
    }
  });
}

//Go back to Notes List.
function goBack() {
  E.showMenu(notesList);
}

//Delete Note
function deleteItem(i) {
  notes.splice(i, 1);
  removeNote(i);
  notes = [];
  initNoteList();
}

//Remove Note from CSV file.
function removeNote(index) {
  f.erase();
  f = require("Storage").open("notes.csv", "a");
  var i = 0;
  for (i = 0; i < notes.length; i++) {
    var items = notes[i].split(",");
    let n = items[0];
    let t = items[1];
    var d = items[2];
    d = d.replace("\n", "");
    let csv = [n, t, d].join(",");
    f.write(csv + "\n");
  }
}

/*
Entry point
*/

//Timer ArrowFunctions
const startTimers = () => {
  timer = setInterval(loadView, 500);
};

const stopTimers = () => {
  clearInterval(timer);
};


//Load function
function loadView() {
  g.clear();
  g.setBgColor(0, 0, 0);
  g.drawImage(imgCal);

  if (appIndex == 1) {
    let timeView = new TimeView();
    timeView.loadView();

    let clockView = new ClockView();
    clockView.loadView();

    let stepView = new StepView();
    stepView.loadView();
  }
}

//Listen swipe
Bangle.on('swipe', (sDir) => {
  let prevIndex = appIndex;
  if (sDir == 1) {
    if (appIndex > 0) {
      prevAppIndex = appIndex;
      appIndex--;
    }
  } else {
    if (appIndex < (apps.length - 1)) {
      prevAppIndex = appIndex;
      appIndex++;
    }
  }
  if (prevIndex !== appIndex) {
    switchApp();
  }
});

//StartTimer ArrowFunction
const switchApp = () => {
  switch (appIndex) {
    case 0:
      stopTimers();
      initNoteList();
      break;
    case 1:
      E.showMenu();
      clearWatch();
      if (prevAppIndex == 2) {
        noteApp.saveNote(this);
        setTimeout(startTimers, 800);
      } else {
        startTimers();
      }
      break;
    case 2:
      stopTimers();
      noteApp = new NoteApp();
      noteApp.loadView();
      break;
    default:
      break;
  }
};

//Start
startTimers();