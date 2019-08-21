const https = require('https');
const fs = require('fs');

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
        https.get(page.url, response => response.pipe(file)).on("error", err => console.log(`Error: ${err.message}`));
        return arquivo;
    }
    else 
    {
        return false;
    }
};
