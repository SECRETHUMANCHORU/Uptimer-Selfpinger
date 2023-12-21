const {
    crayon,
    crayons,
    axios,
    express,
    Uptime,
    httpExpressUtils,
    StatusUtils,
    sendRequest  
} = require('./node'); 

const fs = require('fs');

const urlKey = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
const userKey = `${process.env.REPL_OWNER}`;

sendRequest(urlKey, userKey);  

const dbPath = './.config/database.json';

// Read database
function readDatabase() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([], null, 4));
        return [];
    }
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(rawData);
}

// Write to database
function writeDatabase(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 4), 'utf-8');
}

const database = readDatabase();

// Check if the urlKey and userKey exist in the database, if not, add them
const entryExists = database.some(entry => entry.url === urlKey && entry.user === userKey);
if (!entryExists) {
    database.push({ url: urlKey, user: userKey });
    writeDatabase(database);
}

database.forEach(entry => {
    const monitor = new Uptime(entry.url, entry.user);
});

const expresss = require('./express');


const crypto = require('crypto');

const ORIGINAL_CHECKSUM = 'Choru Tiktokers';
const ORIGINAL_LICENSE_CONTENT = `This is for the uptime of your website so that your system does not turn off forever on This by uptime selfpinger by Choru TikTokers
Copyrights Choru TikTokers`;

const LICENSE_PATH = './license';

function computeChecksum(data) {
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

function verifyAndRestoreLicense() {
    let currentContent;

    try {
        currentContent = fs.readFileSync(LICENSE_PATH, 'utf8');
    } catch (err) {
        fs.writeFileSync(LICENSE_PATH, ORIGINAL_LICENSE_CONTENT, 'utf8');
        console.log("License file restored.");
        return;
    }

    const currentChecksum = computeChecksum(currentContent);
    if (currentChecksum !== ORIGINAL_CHECKSUM) {
        fs.writeFileSync(LICENSE_PATH, ORIGINAL_LICENSE_CONTENT, 'utf8');
       // console.log("License file has been tampered with. Restoring...");
    }
}
verifyAndRestoreLicense();
setInterval(verifyAndRestoreLicense, 5000);