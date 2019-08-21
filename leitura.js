const fs = require('fs');
const path = require('path');
const extract = require('pdf-text-extract');

export default function leitura(arquivos) {
    arquivos.map(item => {
        if (item != false) {


            const filePath = path.join(__dirname, `./editais/${item.ref.slice(26)}/${item.url.slice(58)}`)
            extract(filePath, function (err, pages) {
                if (err) {
                    console.dir(err)
                    return
                }
                else {
                    pages.map((pag, index) => {
                        fs.writeFile(`./editais/${item.ref.slice(26)}/${item.url.slice(58, -3)}${index + 1}.txt`, pag, function (erro) {
                            if (erro) {
                                throw erro;
                            }
                        });

                    }
                    )
                };
            })
        }
    });
};