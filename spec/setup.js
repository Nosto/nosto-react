const { JSDOM } = require("jsdom")

const { window } = new JSDOM("<html></html>", { 
    url: "http://localhost", 
    resources: "usable", 
    runScripts: "dangerously" })
global.window = window    
global.location = window.location
global.document = window.document
global.localStorage = window.localStorage
global.navigator = window.navigator

// test mode flag
global.nostoReactTest = true