const https = require('https');
const fs = require('fs');
const axios = require('axios');

export default function download(page) {
    if (page.url.toLowerCase().indexOf(".pdf") > 0 && page.referer.toLowerCase().indexOf("/edital-") > 0) {
        const arquivo = { url: page.url, ref: page.referer }
        if (!fs.existsSync("./editais/")) {
            fs.mkdirSync("./editais/");
        }
        if (!fs.existsSync(`./editais/${page.referer.slice(26)}`)) {
            fs.mkdirSync(`./editais/${page.referer.slice(26)}`);
        }
        const file = fs.createWriteStream(`./editais/${page.referer.slice(26)}/${page.url.slice(58)}`);
        https.get(page.url, response => response.pipe(file)).on("error", err => {
            // axios.post('http://localhost:3333/api/errors', {
            //     error: err
            // });
        });
        return arquivo;
    }
    else {
        return false;
    }
};
