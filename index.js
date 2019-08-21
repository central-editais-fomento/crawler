const Crawler = require("js-crawler");

import leitura from "./leitura.js";
import download from "./download.js";

const arquivos = [];

const crawler = new Crawler().configure({
    depth: 3,
    shouldCrawl: url => url.indexOf("fapergs.rs.gov.br") > 0
});

crawler.crawl(
    "https://fapergs.rs.gov.br/mapa-do-site",
    function onSuccess(page) {
        const arquivo = (download(page));
        arquivos.push(arquivo);
    },
    null,
    function onAllFinished() {
        leitura(arquivos);

    });
