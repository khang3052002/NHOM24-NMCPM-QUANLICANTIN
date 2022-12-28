
const express = require('express');
const dbConnector = require('../models/dbConnect/db');
const exphbs = require('express-handlebars');
const session = require('express-session')
const hbsHelper = require('../models/hbsHelpers/hbsHelper');
const port = 3000;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.sockets.setMaxListeners(100);
const getIO=()=>{
    return io
}
module.exports={io,express,dbConnector,exphbs,session,hbsHelper,port,app,http,getIO}