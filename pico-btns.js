
//Input Button

pinMode(B4, "input_pulldown");
setWatch(function() {
  digitalPulse(LED2, 1, 50);
}, B4, { repeat: true, debounce : 50, edge: "rising" });

digitalRead(B4)
