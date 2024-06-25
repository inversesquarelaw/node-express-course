const EventEmitter = require("events");  

const emitter = new EventEmitter();  // we create an emitter object
let counter = 0;    //counter to track the number of times the event is emitted

setInterval(() => {  
  emitter.emit("timer", `emitter event: ${counter++}`);  
}, 2000);  

emitter.on("timer", (msg) => console.log(msg));     
//the .on() method listens for the event and runs the callback function (a simple console.log) when the event is emitted
//without the .on() method, the event would be emitted (on line 7) but nothing would print to the console