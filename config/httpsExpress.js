const fs = require('fs');
const path = require('path');
const axios = require('axios');
const url = require('url');

function transformUrl(inputUrl) {
    try {
        
        const baseInputUrl = inputUrl.split('#')[0];

        const parsedUrl = new url.URL(baseInputUrl);
        if (parsedUrl.hostname === "replit.com") {
            const pathnameParts = parsedUrl.pathname.split('/').filter(Boolean);
            const username = pathnameParts[1].replace('@', '').toLowerCase();
            const projectname = pathnameParts[2].toLowerCase();
            return `https://${projectname}.${username}.repl.co`;
        }
    } catch {
        
    }
    return inputUrl;  
}



const dbPath = path.join(__dirname, 'database.json');

function readDatabase() {
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(rawData);
}

function writeDatabase(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

const configPath = path.join(__dirname, '../configbot.json');
if (!fs.existsSync(configPath)) {
    const defaultConfig = {
        pass: "ProChoru"
    };
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 4));
}
const configbot = require('../configbot.json');
global.config = configbot;

module.exports = {
    Endpoint: function(app) {
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });


      
app.get('/add', (req, res) => {
    const { url, user } = req.query;

    if (!url || !user) {
        return res.status(400).json({ error: 'URL and User are required' });
    }

  let baseInputUrl = url.split('#')[0];  

let transformedUrl = baseInputUrl;
if (baseInputUrl.includes("replit.com/@")) {
    const parts = baseInputUrl.split('/');
    const username = parts[parts.length - 2].replace('@', '').toLowerCase();
    const projectname = parts[parts.length - 1].toLowerCase();
    transformedUrl = `https://${projectname}.${username}.repl.co`;
}


    const db = readDatabase();

    const urlExists = db.some(entry => entry.url === transformedUrl);
    if (urlExists) {
        return res.status(409).json({ error: 'URL already exists' });
    }

    db.push({ url: transformedUrl, user });
    writeDatabase(db);

    res.json({ success: true });
});



        app.get('/resetdata', (req, res) => {
            const providedPass = req.query.pass;
            if (!providedPass || providedPass !== global.config.pass) {
                return res.status(403).json({
                    error: 'Invalid password'
                });
            }
            try {
                fs.unlinkSync(dbPath);
                res.json({
                    success: true,
                    message: 'Data reset successful'
                });
            } catch (error) {
                res.status(500).json({
                    error: 'Error resetting the data'
                });
            }
        });

        app.get('/remove', (req, res) => {
            const {
                url
            } = req.query;
            if (!url) {
                return res.status(400).json({
                    error: 'URL is required for removal'
                });
            }
            const db = readDatabase();
            const newDb = db.filter(entry => entry.url !== url);
            if (newDb.length === db.length) {
                return res.status(404).json({
                    error: 'URL not found'
                });
            }
            writeDatabase(newDb);
            res.json({
                success: true
            });
        });

        app.get('/checkuptime', async (req, res) => {
            const database = readDatabase();
            const statusPromises = database.map(entry => {
                return axios.get(entry.url)
                    .then(() => ({
                        url: entry.url,
                        status: '✅'
                    }))
                    .catch(() => ({
                        url: entry.url,
                        status: '❎'
                    }));
            });
            const statuses = await Promise.all(statusPromises);
            res.json(statuses);
        });
    }
};
