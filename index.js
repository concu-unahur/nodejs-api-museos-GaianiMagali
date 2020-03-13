const superagent = require('superagent');
const fs = require('fs'); 


function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  
  const museos = respuesta.body.results;

  const museums = museos.map( m => {
    return `El primer museo se llama ${m.nombre} (${m.direccion}. Por cualquier consulta comunicarse al ${m.telefono})`
  })

  fs.writeFile('museos.txt', museums, function (err) {
    if (err) throw err;
    console.log('Saved museums!');
  }); 
}

function imprimirOrganismos(error,respuesta) {
  if(error){
    throw new Error('something bronke',error);
  }

  const  organismos = respuesta.body.results;

  const organism = organismos.map(o =>{
    return `Organismo:  Dirección de Relaciones Institucionales ${o.direccion}. Por cualquiero consulta comunicarse al ${o.telefono}`
  })

  fs.writeFile('organismos.txt', organism, function (err) {
    if (err) throw err;
    console.log('Saved organism!');
  }); 
}


function requestMuseos(){
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/museos')
    .query({ format: 'json' })
    .end(imprimirMuseos)
}

function requestOrganismos() {
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/organismos')
    .query({ format: 'json' })
    .end(imprimirOrganismos)
}

requestMuseos();
requestOrganismos();

