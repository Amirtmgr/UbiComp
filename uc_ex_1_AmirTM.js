/*  UbiComp Ex. 1
    Submitted by Amir Thapa Magar
    Student of MSc. CS (Winter 20/21)
    Matriculation No.: 1607576
*/

//Required
require("FontCopasetic40x58Numeric").add(Graphics);
require("FontTeletext10x18Ascii").add(Graphics);

//Global Constants
const locale = require('locale');
const imgStep = {
  width : 35, height : 35, bpp : 8,
  transparent : 254,
  buffer : require("heatshrink").decompress(atob("/wA/AH4A/AH4A/AH4A/AF0+AAIGFELYcDFAwhXDgoidAAwheVbgiJFCYTDIRQiXDJRtUEY4kbeA4bGI6xIFaLKkPFS4kKaiZtLBIpIfEQaXYbZAiZNpAiaEg4icRTwA5"))
};
const imgCal = {
  width : 30, height : 30, bpp : 8,
  transparent : 254,
  buffer : require("heatshrink").decompress(atob("/wA/AAXX64LVCI4SIBRQAD3YACCIPQAwYAD6ALBAwYcKy4dNy4eJDo3JDo/JDqAeB0oREBRYdKACQdjYIQAUDv4d/Dv4d/Dv4d/DtIeWDgwA/AGg"))
};


//LCD Attributes class
class LCDAttr{
  static get widgetHeight(){
    return 13;  
  }
  
  static get height() {
    return g.getHeight();
  }

  static get width() {
    return g.getWidth();
  }

  static get centerY(){
    return this.height/2 + this.widgetHeight;
  }

  static get centerX(){
    return this.width/2;
  }

  static get center(){
    return [this.centerX, this.centerY];
  }
}

//UIColors 
class UIColors{
  static white() {
     g.setColor(1,1,1);
  }

  static black(){
    g.setColor(0,0,0);
  }
  
  static gray(){
    g.setColor(200/255,200/255,200/255);
  }
  
  static blue() {
     g.setColor(3/255,146/255,254/255);
  }

  static cyan(){
    g.setColor(8/255,206/255,216/255);
  }
  
  static yellow() {
     g.setColor(1,207/255,27/255);
  }
  
  static red(){
    g.setColor(244/255,54/255,59/255);
  }
  
  static green(){
    g.setColor(46/255,204/255,113/255);
  }
  
  static accent(){
    g.setColor(54/255,238/255,224/255);
  }
  
  static primary(){
  g.setColor(50/255, 30/255, 130/255);
  }
  
  static tint(){
    g.setColor(249/255, 156/255, 57/255);
  }
  static secondary(){
    g.setColor(245/255, 245/255, 245/255);
  }
  
  static aqua(){
    g.setColor(42/255, 183/255, 171/255);
  }
  
  static ocean(){
    g.setColor(63/255, 141/255, 141/255);
  }
}

//UIFonts
class UIFonts{
  static setTeleText() {
     g.setFontTeletext10x18Ascii();
  }
  
  static setCopasetic(){
  g.setFontCopasetic40x58Numeric();
  }
  
  static set6X8(size){
    g.setFont("6x8",size);
  }
  
   static setVector(size){
    g.setFont("Vector",size);
  }
  
  static alignCenter(){
    g.setFontAlign(0,0);
  }
  static alignLeftCenter(){
    g.setFontAlign(-1,0);
  }
  static alignRightCenter(){
    g.setFontAlign(1,0);
  }
  static alignRightTop(){
    g.setFontAlign(1,-1);
  }
  static alignLeftTop(){
    g.setFontAlign(-1,-1);
  }
  static alignRightBottom(){
    g.setFontAlign(1,1);
  }
   static alignLeftBottom(){
    g.setFontAlign(-1,1);
  }
  static alignCenterTop(){
    g.setFontAlign(0,-1);
  }
  static alignCenterBottom(){
    g.setFontAlign(0,1);
  }
}


//Clock View class 
class ClockView {
  
  constructor() {
    this.pRad = Math.PI / 180;
    this.faceRad = 97;
  }
  
  loadView(){
    this.resetDots();
    this.renderClock();
  }
  
  drawDot(angle){
    //Large dot in each 30 degrees 
    const radius = (angle % 30) ? 2.5 : 5;
    const a = angle * this.pRad;
    const x = LCDAttr.centerX + Math.sin(a) *   this.faceRad;
    const y = LCDAttr.centerY - Math.cos(a) * this.faceRad;
    g.drawCircle(x, y, radius);
    g.fillCircle(x,y,radius - 2);
  }

  resetDots(){
    UIColors.primary();
    for (let i = 0; i < 60; i++) {
      this.drawDot((360 * i) / 60);
    }
  }

  renderClock(){
    let currentDate = new Date();
    const currentSec = currentDate.getSeconds();
    for (let i = 0; i < 60; i++) {
      if (i > currentSec) {
       UIColors.primary();
      } else if (i===currentSec) {
       UIColors.green();
      } else {
        UIColors.blue();
      }
      this.drawDot((360 * i) / 60);
    }
  }
}

//TimeView Class
class TimeView{
  constructor(){
    this.margin = 5;
    this.pad = 1;
    this.lineWidth = 40;
  }

  //Load method
  loadView(){
    this.renderDate();
    this.renderTime();
  }
  
  //Render methods  
   renderDate(){
    let date = this.getTime()[3];
    UIFonts.setVector(15);
    UIColors.black();
    UIFonts.alignCenter();
    g.drawString(date[1],imgCal.width/2 + this.pad, imgCal.height/2 + 3);
    let dateStr = date[0] + " "+ date[2];
    UIColors.white();
    UIFonts.set6X8(1);
    UIFonts.alignLeftBottom();
    g.drawString(dateStr, imgCal.width + 2, imgCal.height - this.margin + this.pad);
    UIFonts.alignLeftBottom();
    UIFonts.set6X8(1);
    g.drawString(date[3], imgCal.width + 2, imgCal.height/2);
  }

  renderTime(){
    let arr = this.getTime();
    UIFonts.alignCenterBottom();
    UIFonts.setVector(40);
    let timeStr = arr[0] + ":" + arr[1];
    g.drawString(timeStr,LCDAttr.centerX + 2,LCDAttr.centerY - (2* this.margin) );
    let timeStrWidth = g.stringWidth(timeStr);
    UIFonts.alignLeftBottom();
     UIFonts.setVector(15);
    g.drawString(arr[2], LCDAttr.centerX + timeStrWidth/2, LCDAttr.centerY-15);
    UIColors.blue();
    g.drawLine(LCDAttr.centerX - this.lineWidth, LCDAttr.centerY, LCDAttr.centerX+this.lineWidth, LCDAttr.centerY);
  }

  //Utilities
  getTime(){
    let date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var meridian = "AM";
    hr = parseInt(hr,10);
    if (hr == 0) {
      hr = 12;
      meridian = "AM";
    } else if (hr >= 12) {
      meridian = "PM";
      if (hr>12){
        hr -= 12;
      }
    }
    let hrStr = ("0"+hr).substr(-2);
    let minStr = ("0"+min).substr(-2);
    var dateStr = locale.date(date).split(" ");
    dateStr.push(locale.dow(date, 1));
    return [hrStr,minStr,meridian,dateStr];
  }
  
}
 
//StepView Class
class StepView {
  constructor(){
    this.iconHeight = imgStep.height;
    this.iconWidth = imgStep.width;
    this.goal = 10000;
    this.remaining = 10000;
    this.steps = 0;
  }
  
  loadView(){
    this.steps = this.getStep();
    this.renderSteps();
    this.renderProgress();
  }
  
  renderSteps(){
    let icon_x = LCDAttr.centerX - 40;
    let icon_y = LCDAttr.centerY + 8;
    g.drawImage(imgStep,icon_x, icon_y);
    UIColors.green();
    UIFonts.set6X8(1);
    UIFonts.alignLeftTop();
    g.drawString("STEPS",icon_x+ this.iconWidth, icon_y+5);
    var str_height = g.getFontHeight();
    UIColors.white();
    //UIFonts.setTeleText();
    UIFonts.setVector(20);
    g.drawString(this.steps, icon_x+this.iconWidth, icon_y+ str_height + 10);
    
    str_height = g.getFontHeight();
    UIColors.white();
    UIFonts.set6X8(1);
    g.drawString("Remaining "+ this.remaining, icon_x, icon_y+ 2*str_height + 15);
    UIFonts.alignCenter();
    g.drawString("Siegen", LCDAttr.centerX, 67);
  }
  
  renderProgress(){
    let boxWidth = 100;
    let boxheight = 6;
    let x = LCDAttr.centerX - boxWidth/2;
    let y = LCDAttr.height - 60;
    UIColors.green();
    g.drawRect(x,y,x+boxWidth,y+boxheight);
    var fillWidth = 0;
    if (this.steps >= this.goal){
      fillWidth = boxWidth - 4;
    } else {
     fillWidth = (this.steps/this.goal)*boxWidth;
    }
    UIColors.green();
    g.fillRect(x+2,y+2,x+1+fillWidth,y+boxheight-2);
  }
  
  //Static data, 
  //To do : Use acceleration functions.
  getStep(){
    let val = 7576;
    if(val >= this.goal){
    this.remaining = 0;
    } else {
      this.remaining = this.goal - val;
    }
    return val;
  }
}

//Load function
function loadView(){
  g.clear();
  g.setBgColor(0, 0, 0);
  g.drawImage(imgCal);

  let clockView = new ClockView();
  clockView.loadView();

  let timeView = new TimeView();
  timeView.loadView();
  
  let stepView = new StepView();
  stepView.loadView();
}

//StartTimer ArrowFunction
const startTimers = () => {
  timer = setInterval(loadView, 500);
};

startTimers();



