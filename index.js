const superagent = require('superagent');
const fs = require('fs');

// function imprimirMuseos(error, respuesta) {
//   if (error) {
//     throw new Error('algo se rompió', error);
//   }

//   const cantidad = respuesta.body.count;
//   const museos = respuesta.body.results;

//   console.log(`Se encontraron ${cantidad} museos.`);
//   console.log(`El primer museo se llama ${museos[0].nombre}.`)
// }

function imprimirMuseos(error, respuesta) {
    if (error) {
      throw new Error('algo se rompió', error);
    }
  
    const cantidad = respuesta.body.count;
    const museos = respuesta.body.results;
  
  const museums = museos.map(m => {
    return `${m.nombre} (${m.direccion}). Por cualquier consulta comunicarse al ${m.telefono}`
  })
  
  fs.writeFile('museos.txt', museums, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

console.log('Antes de llamar a superagent')

superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(imprimirMuseos)

console.log('Después de llamar a superagent')
