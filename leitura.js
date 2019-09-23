const fs = require('fs');
const path = require('path');
const extract = require('pdf-text-extract');
const axios = require('axios');

export default function leitura(arquivos) {
    arquivos.map(item => {
        if (item != false) {

            const filePath = path.join(__dirname, `./editais/${item.ref.slice(26)}/${item.url.slice(58)}`)
            extract(filePath, function (err, pages) {
                if (err) {
                    axios.post('http://localhost:3333/api/errors', {
                        error: err
                    });
                    return
                }
                else {

                    pages.map((pag, index) => {

                        if (index == 0) {
                            try {
                                var resultProj = pag.match(/projeto/gi);
                                if (resultProj != null) {
                                    console.log(`Projeto: ${resultProj.length} `)
                                }
                                else {
                                    console.log(`projeto=0 edital: ${item.ref.slice(26)} arquivo:${item.url.slice(58)}`)
                                }
                                var resultProjs = pag.match(/b/gi);
                                if (resultProj != null) {
                                    console.log(` Projetos: ${resultProjs.length}`)
                                }
                                else {
                                    console.log(`projetos=0 edital: ${item.ref.slice(26)} arquivo:${item.url.slice(58)}`)
                                }
                                var resultEvent = pag.match(/c/gi);
                                if (resultProj != null) {
                                    console.log(` Evento: ${resultEvent.length}`)
                                }
                                else {
                                    console.log(`evento=0edital: ${item.ref.slice(26)} arquivo:${item.url.slice(58)}`)
                                }
                                var resultEvents = pag.match(/d/gi);
                                if (resultProj != null) {
                                    console.log(` Eventos: ${resultEvents.length}`)
                                }
                                else {
                                    console.log(`eventos=0edital: ${item.ref.slice(26)} arquivo:${item.url.slice(58)}`)
                                }
                                var resultBolsa = pag.match(/e/gi);
                                if (resultProj != null) {
                                    console.log(` Bolsa: ${resultBolsa.length}`)
                                }
                                else {
                                    console.log(`bolsa=0edital: ${item.ref.slice(26)} arquivo:${item.url.slice(58)}`)
                                }
                                var resultBolsas = pag.match(/f/gi);
                                if (resultProj != null) {
                                    console.log(` Bolsas: ${resultBolsas.length}`)
                                }
                                else {
                                    console.log(`bolsas =0 edital: ${item.ref.slice(26)} arquivo:${item.url.slice(58)}`)
                                }
                            } catch (error) {
                                console.log(error)
                            }

                        }


                        fs.writeFile(`./editais/${item.ref.slice(26)}/${item.url.slice(58, -3)}${index + 1}.txt`, pag, function (erro) {
                            if (erro) {
                                throw erro;
                            }

                        });

                    });
                    // axios.post('http://localhost:3333/api/file', {
                    //     pagina: pages

                    // });
                };
            })
        }
    });
};