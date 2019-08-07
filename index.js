const Crawler = require("js-crawler");
const https = require('https');
const fs = require('fs');
const path = require('path');
const extract = require('pdf-text-extract');

let arquivos = [];

const crawler = new Crawler().configure({
    depth: 3,
    shouldCrawl: url => url.indexOf("fapergs.rs.gov.br") > 0
});

crawler.crawl(
    "https://fapergs.rs.gov.br/mapa-do-site",
    function onSuccess(page) {

        if (page.url.toLowerCase().indexOf(".pdf") > 0 && page.referer.toLowerCase().indexOf("/edital-") > 0) {
            arquivos.push({ url: page.url, ref: page.referer });
            if (!fs.existsSync("./editais/")) {
                fs.mkdirSync("./editais/");
            }
            if (!fs.existsSync(`./editais/${page.referer.slice(26)}`)) {
                fs.mkdirSync(`./editais/${page.referer.slice(26)}`);
            }
            const file = fs.createWriteStream(`./editais/${page.referer.slice(26)}/${page.url.slice(58)}`);
            https.get(page.url, response => response.pipe(file)).on("error", err => console.log(`Error: ${err.message}`));
        }
    },
    null,
    function onAllFinished() {

        arquivos.map(item => {
            const filePath = path.join(__dirname, `./editais/${item.ref.slice(26)}/${item.url.slice(58)}`)
            extract(filePath, function (err, pages) {
                if (err) {
                    console.dir(err)
                    return
                }
                else {
                    fs.writeFile(`./editais/${item.ref.slice(26)}/${item.url.slice(58, -3)}.txt`, pages, function (erro) {
                        if (erro) {
                            throw erro;
                        }
                    });

                }

            })
        });
    });
