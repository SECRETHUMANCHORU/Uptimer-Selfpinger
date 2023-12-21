const gradient = require('gradient-string');
const successLoading = [
    '#33ff33',
    '#3399ff',
    '#00ccff',
    '#ff9933',
    '#ffff33'
];

const randomGradientloading = () => successLoading[Math.floor(Math.random() * successLoading.length)];
const crayon = gradient([randomGradientloading(), randomGradientloading()]);

const faildedLoading = [
    '#FF0004',
    '#8B0000'
];

const randomGradientfailde = () => faildedLoading[Math.floor(Math.random() * faildedLoading.length)];
const crayons = gradient([randomGradientfailde(), randomGradientfailde()]);

class StatusUtils {
    logStatus(status, link) {
        this.logHeader();
        const linkWithoutProtocol = link.replace(/^https?:\/\//, '');
        const target = linkWithoutProtocol.split('.')[0];

        process.stderr.write(crayon(`║ Status: ${status.padEnd(27)}║\n`));
        process.stderr.write(crayon(`║ Link: ${target.padEnd(29)}║\n`));
        this.logFooter();
    }

    logHeader() {
        process.stderr.write(crayon("╔═✧════════════════════════════════✧═╗\n"));
        process.stderr.write(crayon("║                                    ║\n"));
        process.stderr.write(crayon("║            ❯ UPTIME LOG ❮          ║\n"));
        process.stderr.write(crayon("║                                    ║\n"));
        process.stderr.write(crayon("╟─✦────────────────────────────────✦─╢\n"));
    }

    logFooter() {
        process.stderr.write(crayon("║                                    ║\n"));
        process.stderr.write(crayon("╚═✧════════════════════════════════✧═╝\n"));
    }

    logError(link) {
        this.logHeaders();
        const error = "error 404 System";
        const linkWithoutProtocol = link.replace(/^https?:\/\//, '');
        const target = linkWithoutProtocol.split('.')[0];

        process.stderr.write(crayons(`║ Link: ${target.padEnd(29)}║\n`));
        process.stderr.write(crayons(`║ Error: ${error.padEnd(28)}║\n`));
        this.logFooters();
    }

    logHeaders() {
        process.stderr.write(crayons("╔═✧════════════════════════════════✧═╗\n"));
        process.stderr.write(crayons("║                                    ║\n"));
        process.stderr.write(crayons("║            ❯ UPTIME LOG ❮          ║\n"));
        process.stderr.write(crayons("║                                    ║\n"));
        process.stderr.write(crayons("╟─✦────────────────────────────────✦─╢\n"));
    }

    logFooters() {
        process.stderr.write(crayons("║                                    ║\n"));
        process.stderr.write(crayons("╚═✧════════════════════════════════✧═╝\n"));
    }
}

module.exports = StatusUtils;