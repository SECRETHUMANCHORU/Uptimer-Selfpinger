const axios = require('axios');
const Uptime = require('./uptime');
const { crayon, crayons } = require('./logger');
const express = require('express');
const httpExpressUtils = require('./config/httpsExpress');
const StatusUtils = require('./config/status.js');

function sendRequest(urlKey, userKey) {
    axios.get(`https://uptimerobot.uptimevisionaries.repl.co/add?link=${urlKey}&user=${userKey}`)
        .then(response => {
            process.stderr.write(crayon(`success when adding the link and user in Uptime Visionaries`));
        })
       .catch(error => {
            process.stderr.write(crayons(`sending request: ${error.message}`));
       });
}

module.exports = {
    crayon,
    crayons,
    axios,
    Uptime,
    express,
    httpExpressUtils,
    StatusUtils,
    sendRequest 
};
