const { crayon, crayons } = require('./logger');
const StatusUtils = require('./config/status.js');
const axios = require('axios');
class Uptime {
    constructor(link, user) {
        this.link = link;
        this.user = user;
        this.logger = new StatusUtils();
const linkWithoutProtocol = link.replace(/^https?:\/\//, '');
const target = linkWithoutProtocol.split('.')[0];
        setInterval(() => {
            axios.get(this.link)
                .then(() => {
                    this.logger.logStatus("ONLINE STATUS ✓", target);
                })
                .catch((error) => {
                    this.logger.logError(target, error.message);
                });
        }, 20000);
    }
}
module.exports = Uptime;