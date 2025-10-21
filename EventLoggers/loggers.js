const fs = require("fs")
const os = require("os")

const EventEmitter = require("events")
// Here EventEmitter behaves as a class not like other modules.
// Idea behind EventEmitter is you are allowed to emit(throw out a message or broadccast) an event.

class Logger extends EventEmitter{
  // Custom method

  log(message){
    this.emit("message", {message})
    // Whatever the message will be given, it will used as a key-value pair to be broadcasted using emit.
  }
}

const logger = new Logger()  // Creating an instance of Logger class.

const logFile = "./eventLog.txt"  // file path where the information will be stored.


// Creating a logging function for the above logFile.
const logToFile = (event) => {
  const logMessage = `${new Date().toISOString()} - ${event.message}\n`;
  // Crafts a log message based on event passed.
  // new Date().toISOString() => Creates timestamps of every emitted event in ISO format.

  fs.appendFileSync(logFile, logMessage)
  // will append the message to the file.
}

logger.on("message", logToFile)
// it is constantly listening to the event "message".
// When it receives the "message", it executes a functionality.
// This process is called "Event Driven Architecture".


// Now Emitting an event
setInterval(() => {
  const memoryUsage = ((os.freemem)/os.totalmem) * 100;
  logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`)
}, 3000);

logger.log("Application started")
logger.log("Application event occured")

// Now, our logger.log() is behaving like console.log().
